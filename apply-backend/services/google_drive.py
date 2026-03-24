"""Google Drive integration for file uploads."""

import io
import json
import logging

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

from config import settings

logger = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def get_credentials() -> Credentials:
    """Build Google service-account credentials from the JSON env var."""
    info = json.loads(settings.GOOGLE_CREDENTIALS_JSON)
    return Credentials.from_service_account_info(info, scopes=SCOPES)


def _drive_service():
    return build("drive", "v3", credentials=get_credentials(), cache_discovery=False)


def create_folder(name: str, parent_folder_id: str) -> str:
    """Create a subfolder inside *parent_folder_id* and return its ID."""
    service = _drive_service()
    metadata = {
        "name": name,
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [parent_folder_id],
    }
    folder = service.files().create(body=metadata, fields="id").execute()
    folder_id = folder["id"]
    logger.info("Created Drive folder '%s' (id=%s)", name, folder_id)
    return folder_id


def upload_file(
    file_bytes: bytes,
    filename: str,
    mime_type: str,
    folder_id: str,
) -> str:
    """Upload a file to Google Drive and return a shareable web link."""
    service = _drive_service()

    metadata = {"name": filename, "parents": [folder_id]}
    media = MediaIoBaseUpload(io.BytesIO(file_bytes), mimetype=mime_type, resumable=True)

    uploaded = (
        service.files()
        .create(body=metadata, media_body=media, fields="id,webViewLink")
        .execute()
    )

    # Make the file readable by anyone with the link
    service.permissions().create(
        fileId=uploaded["id"],
        body={"type": "anyone", "role": "reader"},
    ).execute()

    link = uploaded.get("webViewLink", f"https://drive.google.com/file/d/{uploaded['id']}/view")
    logger.info("Uploaded '%s' -> %s", filename, link)
    return link
