#!/usr/bin/env python3
"""CLI script to send decision emails to applicants.

Usage:
    python notify.py --decision accept --id APP0001
    python notify.py --decision reject --id APP0002 --notes "Thank you for your interest..."
    python notify.py --decision waitlist --id APP0003
    python notify.py --decision interview --id APP0004 --notes "We'd like to schedule an interview..."
"""

import argparse
import sys
import os

# Allow running from the scripts/ directory or the project root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from services.google_sheets import get_application_by_id, update_application_status
from services.email import send_decision


def main() -> None:
    parser = argparse.ArgumentParser(description="Send a decision email to an applicant.")
    parser.add_argument("--id", required=True, help="Application ID (e.g. APP0001)")
    parser.add_argument(
        "--decision",
        required=True,
        choices=["accept", "reject", "waitlist", "interview"],
        help="Decision to communicate",
    )
    parser.add_argument("--notes", default="", help="Optional notes to include in the email")
    args = parser.parse_args()

    application = get_application_by_id(args.id)
    if application is None:
        print(f"Error: Application '{args.id}' not found in the sheet.")
        sys.exit(1)

    applicant_name = application["Full Name"]
    email = application["Email"]
    position_type = application["Position Type"]

    print(f"Applicant : {applicant_name}")
    print(f"Email     : {email}")
    print(f"Position  : {position_type}")
    print(f"Decision  : {args.decision}")
    if args.notes:
        print(f"Notes     : {args.notes}")
    print()

    # Update the sheet
    update_application_status(args.id, args.decision, args.notes)
    print(f"Sheet updated: {args.id} -> {args.decision}")

    # Send email
    send_decision(
        to_email=email,
        applicant_name=applicant_name,
        position_type=position_type,
        decision=args.decision,
        notes=args.notes if args.notes else None,
    )
    print(f"Decision email sent to {email}")


if __name__ == "__main__":
    main()
