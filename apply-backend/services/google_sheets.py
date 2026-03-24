"""Google Sheets integration for application data storage."""

import json
import logging
from datetime import datetime

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

from config import settings

logger = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

COLUMNS = [
    "Application ID",
    "Timestamp",
    "Position Type",
    "Designation",
    "Short Name",
    "Full Name",
    "Email",
    "Phone",
    "Nationality",
    "Residence",
    "Affiliation",
    "Google Scholar",
    "Personal Website",
    "Degree",
    "Field",
    "Institution",
    "GPA",
    "Graduation Date",
    "English Proficiency",
    "English Score",
    "CV Link",
    "Reflection Type",
    "Reflection Text/Link",
    "Pitch Deck Link",
    "Technical Skills",
    "Research Areas",
    "AI Plans",
    "Start Date",
    "Duration",
    "Family Status",
    "Funding Status",
    "Fellowship Name",
    "Ref1 Name",
    "Ref1 Email",
    "Ref1 Affiliation",
    "Ref1 Relationship",
    "Ref2 Name",
    "Ref2 Email",
    "Ref2 Affiliation",
    "Ref2 Relationship",
    "Heard About",
    "Extra Documents",
    "Status",
    "Decision Notes",
]

SHEET_RANGE = "Sheet1"


def _get_credentials() -> Credentials:
    info = json.loads(settings.GOOGLE_CREDENTIALS_JSON)
    return Credentials.from_service_account_info(info, scopes=SCOPES)


def _sheets_service():
    return build("sheets", "v4", credentials=_get_credentials(), cache_discovery=False)


def _col_index(name: str) -> int:
    """Return the 0-based index for a column name."""
    return COLUMNS.index(name)


def _col_letter(index: int) -> str:
    """Convert 0-based index to spreadsheet column letter (A, B, ..., AZ)."""
    if index < 26:
        return chr(65 + index)
    return chr(64 + index // 26) + chr(65 + index % 26)


def append_application(data: dict) -> str:
    """Append a new application row and return the generated Application ID."""
    service = _sheets_service()
    spreadsheet_id = settings.GOOGLE_SHEET_ID

    # Determine next application ID by reading existing rows
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=f"{SHEET_RANGE}!A:A")
        .execute()
    )
    existing_rows = result.get("values", [])
    next_num = len(existing_rows)  # row 0 is header (if present), so count gives next number
    if next_num == 0:
        # No header yet — write header first
        service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id,
            range=f"{SHEET_RANGE}!A1",
            valueInputOption="RAW",
            body={"values": [COLUMNS]},
        ).execute()
        next_num = 1

    app_id = f"APP{next_num:04d}"
    data["Application ID"] = app_id
    data["Timestamp"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    data.setdefault("Status", "pending")
    data.setdefault("Decision Notes", "")

    row = [str(data.get(col, "")) for col in COLUMNS]

    service.spreadsheets().values().append(
        spreadsheetId=spreadsheet_id,
        range=f"{SHEET_RANGE}!A1",
        valueInputOption="RAW",
        insertDataOption="INSERT_ROWS",
        body={"values": [row]},
    ).execute()

    logger.info("Appended application %s", app_id)
    return app_id


def get_applications(filters: dict | None = None) -> list[dict]:
    """Read all application rows with optional filtering."""
    service = _sheets_service()
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=settings.GOOGLE_SHEET_ID, range=SHEET_RANGE)
        .execute()
    )
    rows = result.get("values", [])
    if len(rows) < 2:
        return []

    header = rows[0]
    applications = []
    for row in rows[1:]:
        # Pad short rows
        padded = row + [""] * (len(header) - len(row))
        record = dict(zip(header, padded))
        applications.append(record)

    if not filters:
        return applications

    filtered = applications
    if filters.get("position_type"):
        filtered = [a for a in filtered if a.get("Position Type", "").lower() == filters["position_type"].lower()]
    if filters.get("status"):
        filtered = [a for a in filtered if a.get("Status", "").lower() == filters["status"].lower()]
    if filters.get("date_from"):
        filtered = [a for a in filtered if a.get("Timestamp", "") >= filters["date_from"]]
    if filters.get("date_to"):
        filtered = [a for a in filtered if a.get("Timestamp", "") <= filters["date_to"]]

    return filtered


def get_application_by_id(application_id: str) -> dict | None:
    """Return a single application dict or None."""
    apps = get_applications()
    for app in apps:
        if app.get("Application ID") == application_id:
            return app
    return None


def update_application_status(application_id: str, status: str, notes: str) -> None:
    """Update the Status and Decision Notes columns for a given application."""
    service = _sheets_service()
    spreadsheet_id = settings.GOOGLE_SHEET_ID

    # Read all IDs to find the row number
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=f"{SHEET_RANGE}!A:A")
        .execute()
    )
    rows = result.get("values", [])
    target_row = None
    for i, row in enumerate(rows):
        if row and row[0] == application_id:
            target_row = i + 1  # 1-based row number in the sheet
            break

    if target_row is None:
        raise ValueError(f"Application {application_id} not found")

    status_col = _col_letter(_col_index("Status"))
    notes_col = _col_letter(_col_index("Decision Notes"))

    # Batch update both cells
    service.spreadsheets().values().batchUpdate(
        spreadsheetId=spreadsheet_id,
        body={
            "valueInputOption": "RAW",
            "data": [
                {"range": f"{SHEET_RANGE}!{status_col}{target_row}", "values": [[status]]},
                {"range": f"{SHEET_RANGE}!{notes_col}{target_row}", "values": [[notes]]},
            ],
        },
    ).execute()

    logger.info("Updated %s -> status=%s", application_id, status)
