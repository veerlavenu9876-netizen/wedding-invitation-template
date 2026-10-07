# 💍 Luxury Digital Wedding Invitation Micro-Site & Template Suite

A luxury, editorial-grade vertical scrolling digital wedding invitation web application with smooth cinematic reveals, ambient particle animations, Web Audio melody player, live countdown timer, interactive RSVP with automatic Google Sheets sync, guest link personalization, and a passcode-protected Couple Administration Portal.

---

## 🌟 Key Features

- **Continuous Editorial Story**: 8 distinct vertical sections moving seamlessly from botanical arch reveal down to romantic sunset closing with animated heart line.
- **4 Curated Theme Collections**:
  - `01. Romantic Blush`: Soft ivory, peach, blush roses, sage eucalyptus & champagne gold.
  - `02. Emerald & Olive`: Tuscan alabaster, deep cypress emerald, fine-art olive branches & antique gold.
  - `03. Minimalist Editorial`: High-fashion Vogue noir typography with pure negative space and champagne foil rules.
  - `04. Midnight Celestial`: Deepest midnight sapphire, glowing white orchids, gold stardust bokeh and `mix-blend-mode: screen`.
- **Dynamic 1-Click Theme Switcher**: Instant aesthetic transformation on the fly with live particle harmonization.
- **Safe Personalized Guest URLs**: Pre-fill guest names automatically via `?guest=Eleanor+Vance` with sanitized HTML rendering.
- **Zero-Cost Google Sheets Sync**: Connects to the couple's private spreadsheet via Google Apps Script with automatic in-place deduplication.
- **Passcode-Protected Admin Portal** (`admin.html`): Real-time attendance KPIs, catering breakdown, guest search, and 1-click CSV export.

---

## 📁 Project Structure

```text
├── index.html                   # Master digital wedding invitation micro-site
├── admin.html                   # Passcode-protected Couple RSVP & Catering Portal
├── wedding-config.js            # CENTRAL CONFIGURATION (Names, dates, venues, backend)
├── google_sheets_rsvp_backend.gs# Google Apps Script receiver for spreadsheet logging
├── SPREADSHEET_SETUP_GUIDE.md   # Step-by-step 3-minute Google Sheets setup guide
├── vercel.json                  # Production headers & security rules for Vercel
├── .gitignore                   # Ignored files (system, archives, temporary)
├── assets/                      # High-resolution editorial photography & floral borders
│   ├── hero_florals.jpg
│   ├── bottom_florals.jpg
│   ├── emerald_hero_florals.jpg
│   ├── emerald_bottom_florals.jpg
│   ├── midnight_hero_florals.jpg
│   ├── midnight_bottom_florals.jpg
│   ├── venue_florence.jpg
│   ├── reception_dinner.jpg
│   └── couple_closing.jpg
└── standalone-themes/
    ├── theme_01_romantic_blush.html
    ├── theme_02_emerald_olive.html
    ├── theme_03_minimalist_editorial.html
    └── theme_04_midnight_celestial.html
```

---

## 🚀 Running Locally

No build tools, compilation, or package installations are required!
1. Double-click `index.html` to open it in Google Chrome, Safari, Edge, or Firefox.
2. Or use any local development server:
   ```bash
   # Using Python:
   python -m http.server 8000
   
   # Using Node (npx):
   npx serve .
   ```
3. Visit `http://localhost:8000` in your browser.

---

## 🎨 How to Customize for Any Wedding (`wedding-config.js`)

All customization is handled in a **single file**: [`wedding-config.js`](wedding-config.js). You never need to touch HTML or CSS!

### 1. Changing Couple Names & Details
Open `wedding-config.js` and edit:
```javascript
couple: {
  partner1: "Amelia",
  partner2: "Ethan",
  weddingDateISO: "2026-05-27T18:00:00+02:00", // ISO 8601 for countdown
  displayMonth: "May",
  displayDay: "27",
  ceremonyTime: "six o'clock in the evening",
  venueName: "The Ivory Gardens",
  address: "Via dei Colli, 14",
  city: "Florence, Italy"
}
```

### 2. Changing Photos
To replace any photo, simply swap the JPG files in the `assets/` folder with your own photos keeping the same filenames:
- `venue_florence.jpg` ➔ Your wedding venue photo
- `reception_dinner.jpg` ➔ Your reception banquet photo
- `couple_closing.jpg` ➔ Your couple portrait

### 3. Setting the Default Theme
In `wedding-config.js`, choose your default theme:
```javascript
defaultTheme: "blush" // Options: "blush" | "emerald" | "editorial" | "midnight"
```

---

## 📊 Google Sheets RSVP Setup (3 Minutes)

1. Open **[sheets.new](https://sheets.new)** in your browser and name it `Wedding RSVPs`.
2. Go to **Extensions ➔ Apps Script**.
3. Delete any code, copy all code from [`google_sheets_rsvp_backend.gs`](google_sheets_rsvp_backend.gs), and paste it.
4. Click **Deploy ➔ New deployment ➔ Web app**:
   - Description: `Wedding RSVP Endpoint`
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Click **Deploy**, authorize access, and copy the **Web App URL**.
6. Open `wedding-config.js` and paste your URL:
   ```javascript
   rsvp: {
     googleSheetWebhookUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   }
   ```
7. *(Full details available in [SPREADSHEET_SETUP_GUIDE.md](SPREADSHEET_SETUP_GUIDE.md))*

---

## 💌 Personalized Guest Invitation Links

Generate custom URLs to personalize the invitation and pre-fill the guest's name:
- `https://your-domain.com/?guest=Eleanor+Vance`
- `https://your-domain.com/?guest=Lord+and+Lady+Sterling`

When opened, the guest will see an exclusive *"Joyfully Invited: [Name]"* badge in the hero section and their name will automatically populate the RSVP form.

---

## 🔒 Security & Admin Portal Protection

- **Passcode Gate**: The Couple Admin Portal (`admin.html`) is locked with a client-side passcode gate (default: `florence2026`, configurable in `wedding-config.js`).
- **No Indexing**: `admin.html` contains `<meta name="robots" content="noindex, nofollow">` and Vercel security headers so search engines will not index it.
- **Zero Exposed Secrets**: No private Google API keys or credentials are ever stored in frontend JavaScript.

---

## 🌐 Deployment

### Deploy with Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the repository.
3. Keep default settings (Static site, Root Directory `./`).
4. Click **Deploy** — your site is live with global CDN and SSL!

### Deploy with GitHub Pages
1. In your GitHub repository, navigate to **Settings ➔ Pages**.
2. Under **Build and deployment**, set source to `Deploy from a branch`.
3. Choose `main` branch and `/ (root)` folder.
4. Click **Save**.
