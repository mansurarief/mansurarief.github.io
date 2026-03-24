"""FastAPI backend for V&V Lab research application form."""

import logging
from datetime import datetime

from fastapi import FastAPI, File, Form, Header, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import settings
from services.email import send_confirmation, send_decision
from services.google_drive import create_folder, upload_file
from services.google_sheets import (
    append_application,
    get_application_by_id,
    get_applications,
    update_application_status,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="V&V Lab Application API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
MAX_CV_SIZE = 5 * 1024 * 1024          # 5 MB
MAX_REFLECTION_SIZE = 5 * 1024 * 1024  # 5 MB
MAX_PITCH_DECK_SIZE = 20 * 1024 * 1024 # 20 MB

ALLOWED_CV_TYPES = {"application/pdf"}
ALLOWED_REFLECTION_TYPES = {"application/pdf"}
ALLOWED_PITCH_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _require_admin(api_key: str | None) -> None:
    if not api_key or api_key != settings.ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing admin API key")


async def _read_upload(upload: UploadFile, max_size: int, allowed: set[str], label: str) -> bytes:
    """Read and validate an uploaded file."""
    if upload.content_type not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"{label}: unsupported file type '{upload.content_type}'. Allowed: {', '.join(allowed)}",
        )
    data = await upload.read()
    if len(data) > max_size:
        raise HTTPException(
            status_code=400,
            detail=f"{label}: file exceeds maximum size of {max_size // (1024*1024)} MB",
        )
    return data


# ---------------------------------------------------------------------------
# POST /api/apply
# ---------------------------------------------------------------------------
@app.post("/api/apply")
async def apply(
    # Personal info
    position_type: str = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(""),
    nationality: str = Form(""),
    residence: str = Form(""),
    affiliation: str = Form(""),
    short_name: str = Form(""),
    designation: str = Form(""),
    google_scholar: str = Form(""),
    personal_website: str = Form(""),
    # Academic background
    degree: str = Form(""),
    field: str = Form(""),
    institution: str = Form(""),
    gpa: str = Form(""),
    graduation_date: str = Form(""),
    english_proficiency: str = Form(""),
    english_score: str = Form(""),
    # Research
    technical_skills: str = Form(""),
    research_areas: str = Form(""),
    ai_plans: str = Form(""),
    # Logistics
    start_date: str = Form(""),
    duration: str = Form(""),
    funding_status: str = Form(""),
    fellowship_name: str = Form(""),
    # References
    ref1_name: str = Form(""),
    ref1_email: str = Form(""),
    ref1_affiliation: str = Form(""),
    ref1_relationship: str = Form(""),
    ref2_name: str = Form(""),
    ref2_email: str = Form(""),
    ref2_affiliation: str = Form(""),
    ref2_relationship: str = Form(""),
    # Misc
    heard_about: str = Form(""),
    reflection_type: str = Form(""),
    reflection_text: str = Form(""),
    family_status: str = Form(""),
    research_area_other: str = Form(""),
    # Extra document types (optional, up to 6)
    extra_type_1: str = Form(""),
    extra_type_2: str = Form(""),
    extra_type_3: str = Form(""),
    extra_type_4: str = Form(""),
    extra_type_5: str = Form(""),
    extra_type_6: str = Form(""),
    # Files
    cv: UploadFile = File(...),
    reflection_pdf: UploadFile | None = File(None),
    pitch_deck: UploadFile | None = File(None),
    extra_1: UploadFile | None = File(None),
    extra_2: UploadFile | None = File(None),
    extra_3: UploadFile | None = File(None),
    extra_4: UploadFile | None = File(None),
    extra_5: UploadFile | None = File(None),
    extra_6: UploadFile | None = File(None),
):
    """Receive and process a new research position application."""
    # --- Validate required fields ---
    if not full_name.strip() or not email.strip() or not position_type.strip():
        raise HTTPException(status_code=400, detail="full_name, email, and position_type are required")

    try:
        # --- Read & validate files ---
        cv_bytes = await _read_upload(cv, MAX_CV_SIZE, ALLOWED_CV_TYPES, "CV")

        reflection_bytes = None
        if reflection_pdf is not None and reflection_pdf.filename:
            reflection_bytes = await _read_upload(
                reflection_pdf, MAX_REFLECTION_SIZE, ALLOWED_REFLECTION_TYPES, "Reflection PDF"
            )

        pitch_bytes = None
        if pitch_deck is not None and pitch_deck.filename:
            pitch_bytes = await _read_upload(
                pitch_deck, MAX_PITCH_DECK_SIZE, ALLOWED_PITCH_TYPES, "Pitch Deck"
            )

        # --- Create Drive folder ---
        date_str = datetime.utcnow().strftime("%Y%m%d")
        safe_name = full_name.strip().replace(" ", "_")
        folder_name = f"{safe_name}_{date_str}"

        # Create Applications/{position_type} folder (or reuse existing)
        position_folder_id = create_folder(
            f"Applications/{position_type}", settings.GOOGLE_DRIVE_FOLDER_ID
        )
        applicant_folder_id = create_folder(folder_name, position_folder_id)

        # --- Upload files ---
        cv_link = upload_file(cv_bytes, cv.filename or "cv.pdf", cv.content_type, applicant_folder_id)

        reflection_link = ""
        if reflection_bytes is not None:
            reflection_link = upload_file(
                reflection_bytes,
                reflection_pdf.filename or "reflection.pdf",
                reflection_pdf.content_type,
                applicant_folder_id,
            )

        pitch_link = ""
        if pitch_bytes is not None:
            pitch_link = upload_file(
                pitch_bytes,
                pitch_deck.filename or "pitch_deck.pdf",
                pitch_deck.content_type,
                applicant_folder_id,
            )

        # --- Upload extra documents (up to 6) ---
        extra_files = [extra_1, extra_2, extra_3, extra_4, extra_5, extra_6]
        extra_types = [extra_type_1, extra_type_2, extra_type_3, extra_type_4, extra_type_5, extra_type_6]
        extra_links = []
        for i, ef in enumerate(extra_files):
            if ef is not None and ef.filename:
                ef_data = await ef.read()
                if len(ef_data) <= 10 * 1024 * 1024:  # 10 MB limit
                    label = extra_types[i] or f"extra_{i+1}"
                    link = upload_file(ef_data, ef.filename, ef.content_type, applicant_folder_id)
                    extra_links.append(f"{label}: {link}")

        # --- Build data dict and append to sheet ---
        data = {
            "Position Type": position_type,
            "Designation": designation,
            "Short Name": short_name,
            "Full Name": full_name,
            "Email": email,
            "Phone": phone,
            "Nationality": nationality,
            "Residence": residence,
            "Affiliation": affiliation,
            "Google Scholar": google_scholar,
            "Personal Website": personal_website,
            "Degree": degree,
            "Field": field,
            "Institution": institution,
            "GPA": gpa,
            "Graduation Date": graduation_date,
            "English Proficiency": english_proficiency,
            "English Score": english_score,
            "CV Link": cv_link,
            "Reflection Type": reflection_type,
            "Reflection Text/Link": reflection_text if not reflection_link else reflection_link,
            "Pitch Deck Link": pitch_link,
            "Technical Skills": technical_skills,
            "Research Areas": research_areas,
            "AI Plans": ai_plans,
            "Start Date": start_date,
            "Duration": duration,
            "Family Status": family_status,
            "Funding Status": funding_status,
            "Fellowship Name": fellowship_name,
            "Ref1 Name": ref1_name,
            "Ref1 Email": ref1_email,
            "Ref1 Affiliation": ref1_affiliation,
            "Ref1 Relationship": ref1_relationship,
            "Ref2 Name": ref2_name,
            "Ref2 Email": ref2_email,
            "Ref2 Affiliation": ref2_affiliation,
            "Ref2 Relationship": ref2_relationship,
            "Heard About": heard_about,
            "Extra Documents": " | ".join(extra_links) if extra_links else "",
        }

        app_id = append_application(data)

        # --- Send confirmation email (best-effort) ---
        try:
            send_confirmation(email, full_name, position_type, app_id)
        except Exception:
            logger.exception("Failed to send confirmation email for %s", app_id)

        return {"success": True, "application_id": app_id, "message": "Application submitted successfully."}

    except HTTPException:
        raise
    except Exception:
        logger.exception("Error processing application")
        raise HTTPException(status_code=500, detail="Internal server error while processing application")


# ---------------------------------------------------------------------------
# GET /api/admin/applications
# ---------------------------------------------------------------------------
@app.get("/api/admin/applications")
async def list_applications(
    x_admin_key: str | None = Header(None),
    position_type: str | None = Query(None),
    status: str | None = Query(None),
    date_from: str | None = Query(None),
    date_to: str | None = Query(None),
):
    """List all applications (admin only)."""
    _require_admin(x_admin_key)
    filters = {}
    if position_type:
        filters["position_type"] = position_type
    if status:
        filters["status"] = status
    if date_from:
        filters["date_from"] = date_from
    if date_to:
        filters["date_to"] = date_to

    try:
        applications = get_applications(filters if filters else None)
        return applications
    except Exception:
        logger.exception("Error listing applications")
        raise HTTPException(status_code=500, detail="Failed to retrieve applications")


# ---------------------------------------------------------------------------
# POST /api/admin/decide
# ---------------------------------------------------------------------------
class DecisionRequest(BaseModel):
    application_id: str
    decision: str  # accept | reject | waitlist | interview
    notes: str = ""


@app.post("/api/admin/decide")
async def decide(body: DecisionRequest, x_admin_key: str | None = Header(None)):
    """Set a decision for an application (admin only)."""
    _require_admin(x_admin_key)

    valid_decisions = {"accept", "reject", "waitlist", "interview"}
    if body.decision not in valid_decisions:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid decision '{body.decision}'. Must be one of: {', '.join(sorted(valid_decisions))}",
        )

    try:
        application = get_application_by_id(body.application_id)
        if application is None:
            raise HTTPException(status_code=404, detail=f"Application {body.application_id} not found")

        update_application_status(body.application_id, body.decision, body.notes)

        # Send decision email (best-effort)
        try:
            send_decision(
                to_email=application["Email"],
                applicant_name=application["Full Name"],
                position_type=application["Position Type"],
                decision=body.decision,
                notes=body.notes if body.notes else None,
            )
        except Exception:
            logger.exception("Failed to send decision email for %s", body.application_id)

        return {"success": True}

    except HTTPException:
        raise
    except Exception:
        logger.exception("Error processing decision for %s", body.application_id)
        raise HTTPException(status_code=500, detail="Failed to process decision")


# ---------------------------------------------------------------------------
# GET /health
# ---------------------------------------------------------------------------
@app.get("/health")
async def health():
    return {"status": "ok"}
