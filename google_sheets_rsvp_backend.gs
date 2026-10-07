/**
 * =============================================================================
 * GOOGLE APPS SCRIPT: WEDDING RSVP BACKEND RECEIVER (REUSABLE PRODUCT)
 * =============================================================================
 * 
 * FEATURES:
 * - Zero cost to operate.
 * - Works for ANY Google account and ANY wedding spreadsheet.
 * - Automatically initializes and formats columns with a luxury styling palette.
 * - Prevents duplicates: updates existing guest row in-place if they resubmit.
 * - Stores: Guest Name, Attendance, Headcount, Meal, Phone/Email, Message, Theme, Timestamp.
 * - Validates input and guards against empty submissions.
 * - High concurrency support using Google Apps Script LockService.
 * 
 * QUICK SETUP:
 * 1. Open Google Sheets (https://sheets.new) and name it: "Wedding RSVPs"
 * 2. In top menu, click: Extensions -> Apps Script
 * 3. Delete any template code, paste this entire script, and click Save (Ctrl+S)
 * 4. Click: Deploy -> New deployment
 * 5. Click the gear icon ⚙️ -> Select "Web app"
 * 6. Set:
 *    - Description: "Wedding RSVP Endpoint"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: lets guests RSVP without Google sign-in)
 * 7. Click Deploy, Authorize access, and COPY the Web App URL.
 * 8. Paste the Web App URL into `wedding-config.js` in your invitation project!
 * =============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 15 seconds for concurrent writes
  try {
    lock.waitLock(15000);
  } catch (lockError) {
    return respondJson({
      status: "error",
      message: "Server is busy. Please try submitting again in a moment."
    }, 429);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 1. Initialize sheet headers if brand new
    ensureSheetHeaders(sheet);

    // 2. Parse incoming payload
    var payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback for form-encoded payloads
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    // 3. Server-side validation
    var guestName = (payload.name || "").toString().trim();
    if (!guestName || guestName.length < 2) {
      return respondJson({
        status: "error",
        message: "Invalid submission: Guest name is required."
      }, 400);
    }

    var isAttending = (payload.attending === true || payload.attending === "yes" || payload.attending === "true");
    var attendanceStatus = isAttending ? "Attending" : "Declined";
    var partySize = isAttending ? (parseInt(payload.guests, 10) || 1) : 0;
    var mealPreference = isAttending ? (payload.meal || "Unspecified") : "N/A";
    var contact = (payload.contact || payload.email || payload.phone || "").toString().trim() || "Not provided";
    var message = (payload.message || "").toString().trim() || "No message";
    var themeUsed = (payload.themeUsed || "Romantic Blush").toString().trim();
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone() || "GMT", "yyyy-MM-dd HH:mm:ss");

    // 4. Check for duplicate/existing guest to update in-place
    var existingRow = findRowByGuestName(sheet, guestName);
    var actionType = "Initial RSVP";

    if (existingRow > 0) {
      // Update existing row
      actionType = "Updated RSVP";
      sheet.getRange(existingRow, 1, 1, 9).setValues([[
        formattedDate,
        guestName,
        attendanceStatus,
        partySize,
        mealPreference,
        contact,
        themeUsed,
        message,
        actionType
      ]]);
    } else {
      // Append new row
      sheet.appendRow([
        formattedDate,
        guestName,
        attendanceStatus,
        partySize,
        mealPreference,
        contact,
        themeUsed,
        message,
        actionType
      ]);
    }

    return respondJson({
      status: "success",
      action: actionType,
      guest: guestName,
      attending: isAttending,
      partySize: partySize,
      timestamp: formattedDate
    });

  } catch (err) {
    return respondJson({
      status: "error",
      message: err.toString()
    }, 500);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for health check & diagnostic verification
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = Math.max(0, sheet.getLastRow() - 1); // Exclude header
    return respondJson({
      status: "online",
      spreadsheetName: SpreadsheetApp.getActiveSpreadsheet().getName(),
      sheetName: sheet.getName(),
      totalResponsesRecorded: lastRow,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return respondJson({
      status: "online",
      message: "RSVP backend is active (Spreadsheet context not attached in test run).",
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Ensures header columns and luxury styling exist
 */
function ensureSheetHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Submission Date",
      "Guest Name",
      "Attendance Status",
      "Party Size",
      "Entrée Preference",
      "Phone / Email",
      "Theme Selected",
      "Message to Couple",
      "Status"
    ];

    sheet.appendRow(headers);

    // Apply Luxury Visual Styling to Spreadsheet Header
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setFontColor("#2C2627");
    headerRange.setBackground("#FAF6F0");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");

    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);

    // Set initial comfortable column widths
    sheet.setColumnWidth(1, 160); // Date
    sheet.setColumnWidth(2, 180); // Guest Name
    sheet.setColumnWidth(3, 140); // Attending
    sheet.setColumnWidth(4, 100); // Party Size
    sheet.setColumnWidth(5, 230); // Entrée
    sheet.setColumnWidth(6, 180); // Phone/Email
    sheet.setColumnWidth(7, 160); // Theme
    sheet.setColumnWidth(8, 280); // Message
    sheet.setColumnWidth(9, 130); // Status
  }
}

/**
 * Search for an existing guest row by name (case-insensitive)
 */
function findRowByGuestName(sheet, name) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  var names = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  var searchName = name.toLowerCase().trim();

  for (var i = 0; i < names.length; i++) {
    var currentName = (names[i][0] || "").toString().toLowerCase().trim();
    if (currentName === searchName) {
      return i + 2; // 1-based index including header row
    }
  }
  return -1;
}

/**
 * Helper to construct JSON response
 */
function respondJson(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
