"""File storage via Google Cloud Storage."""

import base64
import json
import logging

from google.cloud import storage
from google.oauth2.service_account import Credentials

from config import settings

logger = logging.getLogger(__name__)

BUCKET_NAME = "vvlab-applications"


def _get_credentials() -> Credentials:
    """Build Google service-account credentials from JSON or base64 env var."""
    if settings.GOOGLE_CREDENTIALS_B64:
        raw = base64.b64decode(settings.GOOGLE_CREDENTIALS_B64)
        info = json.loads(raw)
    else:
        info = json.loads(settings.GOOGLE_CREDENTIALS_JSON)
    return Credentials.from_service_account_info(info)


def _storage_client():
    return storage.Client(credentials=_get_credentials(), project="v-and-v-lab")


def create_folder(name: str, parent_folder_id: str) -> str:
    """For GCS, 'folders' are just path prefixes. Return the path."""
    if parent_folder_id:
        return f"{parent_folder_id}/{name}"
    return name


def upload_file(
    file_bytes: bytes,
    filename: str,
    mime_type: str,
    folder_id: str,
) -> str:
    """Upload a file to GCS and return a public URL."""
    client = _storage_client()
    bucket = client.bucket(BUCKET_NAME)

    blob_path = f"{folder_id}/{filename}" if folder_id else filename
    blob = bucket.blob(blob_path)
    blob.upload_from_string(file_bytes, content_type=mime_type)

    # Make publicly readable
    blob.make_public()
    link = blob.public_url

    logger.info("Uploaded '%s' -> %s", filename, link)
    return link
