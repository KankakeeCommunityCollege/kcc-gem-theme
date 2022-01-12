/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
// JS module to build alert message using data from Google Sheets API v4
//
// This exported module requires you pass it's default-function the `response` object from the API call, as the only argument
//
import parseMarkdownToHTML from './parseMarkdownToHTML.js'; // Parses a simplified markdown into html & creates the paragraph el's with appropriate class
//
const CAMPUS_ALERTS_DIV_ID_STRING = 'emergencyAlerts';  // ID of the div to house campus alerts - already built into the page.
const ALERTS_VISIBLE_CLASS = 'position__offset-alert--visible';
const TARGET = document.getElementById(CAMPUS_ALERTS_DIV_ID_STRING); // This targets an element built into the DOM that we inject everything into.

function injectAlert(target, alert) {
  target.innerHTML = alert;
  return target.classList.add(ALERTS_VISIBLE_CLASS);
}

function checkAlertType(type) {
  return type == 'SCHOOL EMERGENCY/CLOSURE - red' ? 'danger'
  : type == 'SCHOOL INFO - blue' ? 'primary'
  : type == 'SCHOOL INFO - cyan' ? 'info'
  : 'warning';
}

function createAlertsHtml(response) {  // Incoming response from our Google Sheet via the Sheets API
  let [visibility, allPages, content, expire, start, end, type] = response.result.values[2];  // The 3rd row has our table's data
  if (visibility === 'FALSE') // Predefined dropdown options in the Sheet are `'TRUE'` & `'FALSE'`
    return;

  const d = new Date;
  const s = new Date(start);
  const e = new Date(end);
  const alertTypeClass = checkAlertType(type);
  const alertType = checkAlertType(type);
  const alertIsActive = expire === 'FALSE' || expire === 'TRUE' && s.getTime() <= d.getTime() && e.getTime() > d.getTime();
  const indexPageOnly = allPages === 'TRUE' || allPages === 'FALSE' && window.location.pathname == '/';
  let alert = `
<div class="container">
  <div class="row">
    <div class="col">
      <div role="alert" class="alert alert-${alertType} d-lg-flex align-items-center pr-lg-1">
        <div class="typography__last-p--mb0">
          ${parseMarkdownToHTML(content)}
        </div>
        <button
          aria-label="Refresh the alert"
          title="Refresh the alert"
          id="syncAlert"
          type="button"
          class="btn btn-link buttons--sync ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="svg__sync"
            height="24px"
            width="24px"
            viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 
            12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 
            4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
        </button>
        </div>
    </div>
  </div>
</div>`;

  [d,s,e].map(d => d.setHours(0, 0, 0, 0));
  return alertIsActive && indexPageOnly ? injectAlert(TARGET, alert) : null;
}

export default createAlertsHtml;
