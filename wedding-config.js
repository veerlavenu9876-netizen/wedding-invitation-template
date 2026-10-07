/**
 * =============================================================================
 * LUXURY WEDDING INVITATION — CENTRAL CLIENT CONFIGURATION
 * =============================================================================
 * When selling or reusing this template for another client, this is the ONLY
 * file they need to edit to customize names, dates, locations, and backend sync!
 * =============================================================================
 */

window.WEDDING_CONFIG = {
  // 1. Couple & Event Identity
  couple: {
    partner1: "Amelia",
    partner2: "Ethan",
    weddingDateISO: "2026-05-27T18:00:00+02:00", // ISO 8601 for live countdown (Rome/Florence CEST)
    displayMonth: "May",
    displayDay: "27",
    displayYear: "2026",
    ceremonyTime: "six o'clock in the evening",
    venueName: "The Ivory Gardens",
    address: "Via dei Colli, 14",
    city: "Florence, Italy",
    invitationSubtitle: "are inviting you to celebrate their joyous union",
    closingMessage: "We can’t wait to share the most magical evening of our lives with each of you.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46114.70775986877!2d11.226922899999999!3d43.7695604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a56a680d2d6ad%3A0x93d579170c58e0a3!2sFlorence%2C%20Metropolitan%20City%20of%20Florence%2C%20Italy!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus",
    mapDirectionsUrl: "https://maps.google.com/?q=The+Ivory+Gardens+Florence+Italy"
  },

  // 2. RSVP & Google Sheets Integration
  rsvp: {
    /**
     * Paste your Google Apps Script Web App URL below.
     * Example: "https://script.google.com/macros/s/AKfycb.../exec"
     * 
     * Leave as "" if you only want local testing (responses will save to browser storage).
     */
    googleSheetWebhookUrl: "",

    // RSVP Deadline date
    deadlineText: "Kindly Respond by April 15",

    // Allow guests to modify/update their RSVP after submitting
    allowUpdates: true,

    // Admin dashboard security passcode (protects /admin.html)
    adminPasscode: "florence2026",

    // Local storage backup keys
    storageKey: "wedding_rsvp_response",
    allRsvpsKey: "wedding_all_rsvps",

    // Catering Entrée Options
    menuOptions: [
      { value: "Tuscan Beef Tenderloin & Chianti Glaze", label: "Tuscan Beef Tenderloin & Chianti Glaze" },
      { value: "Pan-Seared Mediterranean Sea Bass", label: "Pan-Seared Mediterranean Sea Bass" },
      { value: "Handmade Truffle Risotto (Vegetarian)", label: "Handmade Truffle Risotto (Vegetarian)" },
      { value: "Vegan Summer Harvest Tasting", label: "Vegan Summer Harvest Tasting" }
    ]
  },

  // 3. Default Visual Theme ('blush' | 'emerald' | 'editorial' | 'midnight')
  defaultTheme: "blush"
};
