"""Email sending via Resend API."""

import logging

import httpx

from config import settings

logger = logging.getLogger(__name__)

RESEND_URL = "https://api.resend.com/emails"


def _send(to: str, subject: str, html: str) -> None:
    """Send an email through the Resend API."""
    response = httpx.post(
        RESEND_URL,
        headers={
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "from": settings.EMAIL_FROM,
            "to": [to],
            "subject": subject,
            "html": html,
        },
        timeout=15,
    )
    if response.status_code not in (200, 201):
        logger.error("Resend API error %s: %s", response.status_code, response.text)
        response.raise_for_status()
    logger.info("Email sent to %s — subject: %s", to, subject)


def _base_style() -> str:
    return (
        "font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; "
        "margin: 0 auto; padding: 24px; color: #333;"
    )


def _header_html() -> str:
    return (
        '<div style="border-bottom: 3px solid #003366; padding-bottom: 12px; margin-bottom: 24px;">'
        '<h2 style="margin: 0; color: #003366;">V&amp;V Lab — KFUPM</h2>'
        "</div>"
    )


def _footer_html() -> str:
    return (
        '<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #ddd; '
        'font-size: 12px; color: #888;">'
        "<p>Verification &amp; Validation Lab<br>"
        "King Fahd University of Petroleum &amp; Minerals<br>"
        '<a href="https://mansurarief.github.io" style="color: #003366;">'
        "mansurarief.github.io</a></p>"
        "</div>"
    )


def send_confirmation(
    to_email: str,
    applicant_name: str,
    position_type: str,
    application_id: str,
) -> None:
    """Send an application-received confirmation email."""
    subject = f"Application Received — {position_type} Position ({application_id})"
    html = f"""\
<div style="{_base_style()}">
  {_header_html()}
  <p>Dear {applicant_name},</p>
  <p>Thank you for applying to the <strong>{position_type}</strong> position at the
  Verification &amp; Validation (V&amp;V) Lab, KFUPM.</p>
  <p>Your application has been received and assigned ID
  <strong>{application_id}</strong>. We will review your materials and get back to you
  in due course.</p>
  <p>If you have any questions, please reply to this email.</p>
  <p style="margin-top: 24px;">Best regards,<br>
  <strong>Prof. Mansur Arief</strong><br>
  Assistant Professor, KFUPM</p>
  {_footer_html()}
</div>"""
    _send(to_email, subject, html)


_DECISION_CONTENT = {
    "accept": {
        "subject_verb": "Accepted",
        "body": (
            "We are pleased to inform you that your application for the "
            "<strong>{position_type}</strong> position has been <strong>accepted</strong>."
            "<p>We will follow up shortly with next steps regarding onboarding and logistics.</p>"
        ),
    },
    "reject": {
        "subject_verb": "Decision",
        "body": (
            "After careful review, we regret to inform you that we are unable to offer you "
            "the <strong>{position_type}</strong> position at this time."
            "<p>We encourage you to apply again in the future as new opportunities arise.</p>"
        ),
    },
    "waitlist": {
        "subject_verb": "Waitlisted",
        "body": (
            "After reviewing your application for the <strong>{position_type}</strong> position, "
            "we have placed you on our <strong>waitlist</strong>."
            "<p>We will reach out if a spot becomes available. Thank you for your patience.</p>"
        ),
    },
    "interview": {
        "subject_verb": "Interview Invitation",
        "body": (
            "We were impressed by your application for the <strong>{position_type}</strong> "
            "position and would like to invite you for an <strong>interview</strong>."
            "<p>We will reach out shortly to schedule a convenient time.</p>"
        ),
    },
}


def send_decision(
    to_email: str,
    applicant_name: str,
    position_type: str,
    decision: str,
    notes: str | None = None,
) -> None:
    """Send a decision email (accept / reject / waitlist / interview)."""
    template = _DECISION_CONTENT.get(decision)
    if template is None:
        raise ValueError(f"Unknown decision type: {decision}")

    subject = f"Application {template['subject_verb']} — {position_type} Position"
    body_text = template["body"].format(position_type=position_type)

    notes_block = ""
    if notes:
        notes_block = (
            f'<div style="background: #f5f5f5; border-left: 4px solid #003366; '
            f'padding: 12px 16px; margin: 16px 0;">'
            f"<strong>Additional notes:</strong><br>{notes}</div>"
        )

    html = f"""\
<div style="{_base_style()}">
  {_header_html()}
  <p>Dear {applicant_name},</p>
  <p>{body_text}</p>
  {notes_block}
  <p style="margin-top: 24px;">Best regards,<br>
  <strong>Prof. Mansur Arief</strong><br>
  Assistant Professor, KFUPM</p>
  {_footer_html()}
</div>"""
    _send(to_email, subject, html)
