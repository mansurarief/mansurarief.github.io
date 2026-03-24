# V&V Lab Application Form — Setup Guide

## Architecture

```
GitHub Pages (mansurarief.github.io/apply)
    ↓ POST /api/apply (multipart form)
Google Cloud Run (apply-api.kfupm.io)
    ├─ Google Drive API → file uploads
    ├─ Google Sheets API → application data
    └─ Resend API → confirmation/decision emails
```

---

## Step 1: Google Cloud Setup (one-time)

### 1a. Create Project & Enable APIs

```bash
# Install gcloud CLI: https://cloud.google.com/sdk/docs/install
gcloud auth login
gcloud projects create vvlab-apply --name="V&V Lab Apply"
gcloud config set project vvlab-apply

# Enable APIs
gcloud services enable sheets.googleapis.com drive.googleapis.com run.googleapis.com cloudbuild.googleapis.com
```

### 1b. Create Service Account

```bash
gcloud iam service-accounts create vvlab-apply \
  --display-name="V&V Lab Application Bot"

# Download credentials JSON
gcloud iam service-accounts keys create credentials.json \
  --iam-account=vvlab-apply@vvlab-apply.iam.gserviceaccount.com
```

**Save `credentials.json` securely — you'll need its contents for the env var.**

### 1c. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "V&V Lab Applications"
3. Share it with the service account email: `vvlab-apply@vvlab-apply.iam.gserviceaccount.com` (Editor role)
4. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

### 1d. Create Google Drive Folder

1. Create a folder in Google Drive named "V&V Lab Applications"
2. Share it with the service account email (Editor role)
3. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/{FOLDER_ID}`

---

## Step 2: Resend Email Setup

### 2a. Create Resend Account

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Go to API Keys → Create API Key → copy it

### 2b. Add & Verify Domain (kfupm.io)

1. In Resend dashboard → Domains → Add Domain → `kfupm.io`
2. Resend will give you DNS records to add. Go to your domain registrar and add:

**Required DNS records for `kfupm.io`:**

| Type  | Host/Name                        | Value                                     | TTL  |
|-------|----------------------------------|-------------------------------------------|------|
| MX    | `kfupm.io`                       | `feedback-smtp.us-east-1.amazonses.com`   | 3600 |
| TXT   | `kfupm.io`                       | `v=spf1 include:amazonses.com ~all`       | 3600 |
| TXT   | `resend._domainkey.kfupm.io`     | *(DKIM value from Resend dashboard)*      | 3600 |
| CNAME | `resend._domainkey.kfupm.io`     | *(DKIM CNAME from Resend dashboard)*      | 3600 |

> The exact DKIM records depend on what Resend provides. Follow their dashboard instructions.

3. Wait for verification (usually 5-30 minutes)

---

## Step 3: Deploy Backend to Google Cloud Run

### 3a. Set Environment Variables

```bash
cd apply-backend

# Create .env from template
cp .env.example .env

# Edit .env with your actual values:
# - GOOGLE_CREDENTIALS_JSON: paste the entire credentials.json content as a single line
# - GOOGLE_SHEET_ID: from step 1c
# - GOOGLE_DRIVE_FOLDER_ID: from step 1d
# - RESEND_API_KEY: from step 2a
# - ADMIN_API_KEY: generate a strong random key (e.g. openssl rand -hex 32)
```

### 3b. Deploy

```bash
# Build and deploy to Cloud Run
gcloud run deploy vvlab-apply \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="$(cat .env | tr '\n' ',' | sed 's/,$//')" \
  --memory=256Mi \
  --cpu=1 \
  --max-instances=2 \
  --timeout=120
```

### 3c. Custom Domain (apply-api.kfupm.io)

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service vvlab-apply \
  --domain apply-api.kfupm.io \
  --region us-central1
```

Then add the DNS record Cloud Run tells you:

| Type  | Host/Name              | Value                                    |
|-------|------------------------|------------------------------------------|
| CNAME | `apply-api.kfupm.io`   | `ghs.googlehosted.com.`                 |

Wait for SSL certificate provisioning (5-30 minutes).

### 3d. Verify

```bash
curl https://apply-api.kfupm.io/health
# Should return: {"status":"ok"}
```

---

## Step 4: Update Frontend API URL

In `assets/js/apply.js`, update the API_URL if different:

```javascript
var API_URL = 'https://apply-api.kfupm.io';
```

---

## Step 5: DNS Summary for kfupm.io

Add these records to your domain registrar:

| Type  | Host/Name                        | Value                                   | Purpose           |
|-------|----------------------------------|-----------------------------------------|--------------------|
| CNAME | `apply-api`                      | `ghs.googlehosted.com.`                | Cloud Run API      |
| TXT   | `kfupm.io`                       | `v=spf1 include:amazonses.com ~all`     | Email SPF          |
| TXT/CNAME | `resend._domainkey`          | *(from Resend dashboard)*               | Email DKIM         |

---

## Usage: Admin Scripts

### Send decisions to applicants

```bash
cd apply-backend

# Accept
python scripts/notify.py --decision accept --id APP0001

# Reject with notes
python scripts/notify.py --decision reject --id APP0002 --notes "We appreciate your interest and encourage you to reapply next cycle."

# Invite to interview
python scripts/notify.py --decision interview --id APP0003 --notes "We'd like to schedule a 30-minute video call."

# Waitlist
python scripts/notify.py --decision waitlist --id APP0004
```

### Export applications to CSV

```bash
# All applications
python scripts/export.py --output all_apps.csv

# Filter by status
python scripts/export.py --output pending.csv --status pending

# Filter by position
python scripts/export.py --output phd_apps.csv --position "PhD Student"
```

### List applications via API

```bash
# All applications
curl -H "X-Admin-Key: YOUR_KEY" https://apply-api.kfupm.io/api/admin/applications

# Filter
curl -H "X-Admin-Key: YOUR_KEY" "https://apply-api.kfupm.io/api/admin/applications?status=pending&position_type=PhD%20Student"
```

---

## Google Sheet Columns

The sheet auto-creates these columns on first submission:

| Column | Description |
|--------|-------------|
| Application ID | Auto-generated (APP0001, APP0002, ...) |
| Timestamp | UTC submission time |
| Position Type | Postdoctoral / PhD / Master's / Intern |
| Full Name | Applicant name |
| Email | Contact email |
| Phone | Phone with country code |
| Nationality | |
| Residence | Country of current residence |
| Affiliation | Current institution & role |
| Degree | Highest degree |
| Field | Field of study |
| Institution | Degree-granting institution |
| GPA | With scale |
| Graduation Date | |
| English Proficiency | Native / IELTS / TOEFL |
| English Score | If applicable |
| CV Link | Google Drive link |
| Reflection Type | write / upload |
| Reflection Text/Link | Text content or Drive link |
| Pitch Deck Link | Google Drive link |
| Technical Skills | Comma-separated |
| Research Areas | Comma-separated |
| AI Plans | Free text |
| Start Date | Expected start |
| Duration | |
| Funding Status | |
| Fellowship Name | If applicable |
| Ref1/Ref2 Name, Email, Affiliation, Relationship | |
| Heard About | Referral source |
| **Status** | pending / accept / reject / waitlist / interview |
| **Decision Notes** | Admin notes |

Use the **Status** and **Decision Notes** columns directly in the sheet, or via the admin API/scripts.

---

## Costs

| Service | Free Tier | Your Usage |
|---------|-----------|------------|
| Google Cloud Run | 2M requests/mo, 360K GB-sec | ~50 req/day |
| Google Sheets API | Unlimited (within quota) | ~50 writes/day |
| Google Drive API | 1B operations/day | ~150/day |
| Resend | 100 emails/day | ~50/day |
| **Total** | **$0/month** | |
