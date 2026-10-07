# 💍 Digital Wedding Invitation — Backend Setup & Live Hosting Guide

This guide details how to connect your interactive wedding invitation to **Google Sheets** for automatic RSVP logging, manage guest responses in your **Admin Dashboard**, and deploy the micro-site live on the web for free.

---

## 1. Connect Google Sheets in 2 Minutes (Zero Cost)

Your invitation includes a ready-to-use Google Apps Script backend (`google_sheets_rsvp_backend.gs`) that automatically writes new RSVPs to your Google Sheet in real time.

### Step-by-Step Instructions:
1. Open a new Google Sheet at **[sheets.new](https://sheets.new)** and title it `Amelia & Ethan — Wedding RSVPs`.
2. In the top Google Sheets menu, click **Extensions ➔ Apps Script**.
3. In the script editor that opens, delete all existing code.
4. Open [`google_sheets_rsvp_backend.gs`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/google_sheets_rsvp_backend.gs) in this project, copy all its code, and paste it into the Apps Script editor.
5. In the top right of Apps Script, click the blue **Deploy ➔ New deployment** button.
6. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
7. Set the fields:
   - **Description**: `Wedding RSVP Endpoint`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows invited guests to submit RSVPs without needing a Google account)*
8. Click **Deploy**, click **Authorize access**, and log into your Google account (click *Advanced ➔ Go to script* if prompted).
9. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/.../exec`).
10. Open [`wedding-config.js`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/wedding-config.js) and paste your URL into `googleSheetWebhookUrl`:
    ```javascript
    window.WEDDING_CONFIG = {
      rsvp: {
        googleSheetWebhookUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
      }
    };
    ```

🎉 **Done!** Whenever any guest clicks "Confirm Attendance", their name, attendance status, party size, entrée preference, phone/email, theme variant, and dietary message will instantly appear as a row in your Google Sheet!

---

## 2. Couple Admin RSVP Dashboard (`admin.html`)

You also have a private, dedicated management dashboard located at [`admin.html`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/admin.html):

- **Real-Time KPI Cards**: Total responses, confirmed attendance count, total banquet headcount, and decline count.
- **Catering Breakdown**: Live tally of entrée preferences (*Tuscan Truffle Filet*, *Mediterranean Sea Bass*, *Ricotta Ravioli*, *Porcini Risotto*).
- **Search & Filter**: Filter guests instantly by name or status.
- **📥 1-Click CSV Export**: Downloads a clean `.csv` spreadsheet formatted for wedding planners, venue coordinators, and caterers.
- **Access**: Click the **"Dashboard"** pill in the top-right bar of [`index.html`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/index.html) or open [`admin.html`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/admin.html) directly.

---

## 3. How to Deploy & Host Live (100% Free)

Because this wedding invitation is built with modern HTML5, CSS3, and vanilla JavaScript without server lock-in, it can be deployed to any static host in under 60 seconds:

### Method A: Vercel (Recommended)
1. Run in PowerShell/Terminal in this directory:
   ```bash
   npx vercel
   ```
2. Follow the 3 prompts (hit Enter to accept defaults).
3. Vercel will output your instant live HTTPS URL (e.g. `https://amelia-and-ethan-wedding.vercel.app`).

### Method B: Netlify (Drag & Drop)
1. Visit **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag and drop this folder (`New folder (6)`) directly onto the browser window.
3. Your wedding site will be live instantly with a free SSL certificate.

### Method C: GitHub Pages
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding invitation release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/amelia-ethan-wedding.git
   git push -u origin main
   ```
2. Go to **Settings ➔ Pages** in your GitHub repo and select `Deploy from a branch: main / root`.

---

## 4. Personalized Guest Links

You can pre-fill any guest's name on their invitation link by appending `?guest=` to the URL:

- `https://your-wedding-site.com/?guest=Eleanor+Vance+%26+Julian+Rossi`
- `https://your-wedding-site.com/?guest=Lord+%26+Lady+Sterling`

When the guest opens their link, their name will be personalized and pre-populated into the RSVP form.

---

## 5. File Inventory

| File | Purpose |
| :--- | :--- |
| [`index.html`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/index.html) | Master digital scrolling invitation micro-site with all 8 animated sections |
| [`admin.html`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/admin.html) | Couple's private RSVP analytics dashboard with CSV export |
| [`google_sheets_rsvp_backend.gs`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/google_sheets_rsvp_backend.gs) | Ready-to-paste Google Apps Script code for automatic spreadsheet logging |
| [`assets/`](file:///c:/Users/amith/Desktop/New%20folder%20(6)/assets) | Editorial photography, floral arch, and botanical border assets |
