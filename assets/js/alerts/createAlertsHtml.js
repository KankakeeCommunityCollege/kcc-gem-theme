/*
// Custom JS | written by https://github.com/wdzajicek
// =================================================== */
// JS module to build alert message using data from Google Sheets API v4
//
// This exported module requires you pass it's default-function the `response` object from the API call, as the only argument
//
import parseMarkdownToHTML from './parseMarkdownToHTML.js'; // Parses a simplified markdown into html & creates the paragraph el's with appropriate class

const parent = document.getElementById('emergencyAlerts'); // This targets an element built into the DOM that we inject everything into.

// returns the BS5 color class depending on the choice in the Google Sheet
function checkAlertType(type) {
  return type == 'SCHOOL EMERGENCY/CLOSURE - red' ? 'danger'
  : type == 'SCHOOL WARNING - yellow' ? 'warning'
  : type == 'SCHOOL INFO - blue' ? 'primary'
  : type == 'SCHOOL INFO - cyan' ? 'info'
  : 'warning';
}

// Since the alert systems is rarely used we can get away with a simplified hashing function.
// There's a tiny possibility of hash clashing but it's not likely and alerts are used a few times a year.
// If hashes end up clashing a more formal hashing function (from external library) may be needed but will come with bloat.
function generateAlertKey(alertText) {
  let hash = 0;
  
  for (let i = 0; i < alertText.length; i++) {
    const char = alertText.charCodeAt(i);
    // Simple bitwise shifting math to scramble the integer uniquely
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  // Math.abs ensures we get a clean positive string ID like "college_alert_293847"
  return `college_alert_${Math.abs(hash)}`;
}

// return true if the alert was dismissed already:
function isAlertDismissed(alertId) {
  // 1. Grab the history object (default to empty object if it doesn't exist)
  const storage = JSON.parse(localStorage.getItem('alert_history') || '{}');

  // 2. Check if the specific alertId exists as a key in that object
  // This returns true if found, false if not.
  return alertId in storage;
}

// Returns alert HTML or false if the alert is not current or was dismissed already:
function createAlert(alertData) {
  const [visibility, allPages, content, expire, start, end, type, today] = alertData;
  if (visibility === 'FALSE') // Predefined dropdown options in the Sheet are `'TRUE'` & `'FALSE'`
    return false;
  
  // Generate a unique key/ID for the alert
  const key = generateAlertKey(content);

  if (isAlertDismissed(key))
    return false;
  
  const isEmergencyAlert = type == 'SCHOOL EMERGENCY/CLOSURE - red';
  // By letting Google Sheets define today's date (and the Sheet is locked to Chicago time),
  //  we need to worry about JS date nonsense and edge cases
  const d = new Date(today);
  const s = new Date(start);
  const e = new Date(end);

  [d, s, e].forEach(d => d.setHours(0, 0, 0, 0));
  
  const alertType = checkAlertType(type); // Get the suffix for the BS5 class depending on the alert type
  const isCurrent = s.getTime() <= d.getTime() && e.getTime() >= d.getTime();
  const alertIsActive = expire === 'FALSE' || expire === 'TRUE' && isCurrent;
  const indexPageOnly = allPages === 'TRUE' || allPages === 'FALSE' && window.location.pathname == '/';
  let alert = `
<div data-alert-id="${key}" class="jsDismissibleAlert alert alert-${alertType} alert-dismissible fade show">
  <div class="typography__last-p--mb0">
    ${parseMarkdownToHTML(content)}
  </div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

  if (alertIsActive && indexPageOnly) {
    return alert;
  } else {
    return false;
  }
}

function saveDismissal(alertId) {
  const now = Date.now();
  // 1. Get the existing object or a fresh one
  const storage = JSON.parse(localStorage.getItem('alert_history') || '{}');

  // 2. Add the new alert with a timestamp
  storage[alertId] = now;

  // 3. CLEANUP: Remove any alerts older than 30 days
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  for (const id in storage) {
    if (now - storage[id] > thirtyDays) {
      delete storage[id];
    }
  }

  // 4. Save back to localStorage
  localStorage.setItem('alert_history', JSON.stringify(storage));
}

function initAlertDismissal(activeAlertList) {
  // This BS5 module provides the alert dismissing functionality.
  // No need to call any functions, just importing it registers the proper listeners.
  import('bootstrap/js/dist/alert.js');

  // Listen for dismissal of alerts so that we can save in history
  [...activeAlertList].forEach((alert, i) => {
    alert.addEventListener('closed.bs.alert', e => { // 'closed.bs.alert' is a BS5 event

      saveDismissal(e.target.dataset.alertId);
    });
  })
}

function createAlertsHtml(response) {  // Incoming response from our Google Sheet via the Sheets API
  // row 1 and 2 are instructions and a header row (index 0 and 1)
  // row 3, 4, and 5 can contain an alert (index 2, 3, and 4)
  const alertsHTML = [response[2], response[3], response[4]]
    .map(createAlert)
    .filter(Boolean)
    .join('');
  
  if (!alertsHTML) return;

  parent.insertAdjacentHTML('beforeend', alertsHTML);
  parent.removeAttribute('aria-hidden');

  // Must happen after alert injection so that we can use it to check for presence of alerts
  const activeAlertList = document.querySelectorAll('.jsDismissibleAlert');

  // No need to go any further if there are not alerts in the page
  if (activeAlertList.length === 0)
    return;

  // This BS5 module provides the alert dismissing functionality.
  // No need to call any functions, just importing it registers the proper listeners.
  import('bootstrap/js/dist/alert.js');

  // Listen for dismissal of alerts so that we can save in history
  [...activeAlertList].forEach((alert, i) => {
    alert.addEventListener('closed.bs.alert', e => { // 'closed.bs.alert' is a BS5 event

      saveDismissal(e.target.dataset.alertId);
    });
  })
}

export default createAlertsHtml;
