#!/usr/bin/env python3
"""CLI script to export applications from Google Sheets to CSV.

Usage:
    python export.py --output applications.csv
    python export.py --output applications.csv --status pending --position phd
"""

import argparse
import csv
import sys
import os

# Allow running from the scripts/ directory or the project root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from services.google_sheets import get_applications, COLUMNS


def main() -> None:
    parser = argparse.ArgumentParser(description="Export applications to CSV.")
    parser.add_argument("--output", required=True, help="Output CSV file path")
    parser.add_argument("--status", default=None, help="Filter by status (e.g. pending, accept)")
    parser.add_argument("--position", default=None, help="Filter by position type (e.g. phd, postdoc)")
    args = parser.parse_args()

    filters = {}
    if args.status:
        filters["status"] = args.status
    if args.position:
        filters["position_type"] = args.position

    applications = get_applications(filters if filters else None)

    if not applications:
        print("No applications found matching the given filters.")
        sys.exit(0)

    # Use the COLUMNS ordering as the CSV header
    fieldnames = COLUMNS

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for app in applications:
            writer.writerow(app)

    print(f"Exported {len(applications)} application(s) to {args.output}")


if __name__ == "__main__":
    main()
