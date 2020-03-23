// Custom JS to build an alert message using data coming from a Google Sheets (Using the Sheets API v4)
// ==================================================================================
// This exported module requires you pass the function the `response` object from the API call,
// and `resolve()` from the Promise that the function call is wrapped in (see './campusAlertsSheetsAPI.js')

const CAMPUS_ALERTS_DIV_ID_STRING = 'emergencyAlerts';  // ID of the div to house campus alerts - already built into the page.
const BOOTSTRAP_CONTAINER_CLASS = 'container';  // Class used in Bootstrap 4
const BOOTSTRAP_ROW_CLASS = 'row';  // Class used in Bootstrap 4
const BOOTSTRAP_COL_CLASS = 'col';  // Class used in Bootstrap 4
const BOOTSTRAP_CLOSE_CLASS = 'close';  // Class used in Bootstrap 4
const FALSE_FROM_SHEETS = 'FALSE';  // Because Google Sheets does 'TRUE' & 'FALSE' in all caps, unlike JavaScript
const NO_BOTTOM_MARGIN_CLASS = 'margins__bottom--none';  // A class from the kcc-gem-theme's stylesheet
const BOOTSTRAP_ALERT_CLASS_ARRAY = ['alert', 'alert-warning']; // BS4 classes
const PARAGRAPH_CLASS_ARRAY = ['typography__alert', 'mb-0'];

function addClassesToEl(el, classArr) {
  for (let i = 0, len = classArr.length; i < len; i++) {
    el.classList.add(classArr[i]);
  }
}

function appendElementWithNewNode(el, nodeType, classArr) {
  const newNode = document.createElement(nodeType);
  const classArrIsNotIterable = typeof classArr === 'string';

  classArrIsNotIterable ? newNode.classList.add(classArr) : addClassesToEl(newNode, classArr);
  el.appendChild(newNode);
  return newNode;
}

function createHTML(SHEET_DATA) { // Finally....after all those checks....we get to do something!
  const DOM_TARGET = document.getElementById(CAMPUS_ALERTS_DIV_ID_STRING);
  const MESSAGE = SHEET_DATA[2];
  const container = appendElementWithNewNode(DOM_TARGET, 'div', BOOTSTRAP_CONTAINER_CLASS);
  const row = appendElementWithNewNode(container, 'div', BOOTSTRAP_ROW_CLASS);
  const col = appendElementWithNewNode(row, 'div', BOOTSTRAP_COL_CLASS);
  const alertDiv = appendElementWithNewNode(col, 'div', BOOTSTRAP_ALERT_CLASS_ARRAY);
  const alertParagraph = appendElementWithNewNode(alertDiv, 'p', PARAGRAPH_CLASS_ARRAY);

  alertParagraph.innerHTML = MESSAGE;
}

function zeroDatesTime(dateObjectArr) {
  for (let i = 0, len = dateObjectArr.length; i < len; i++) {
    dateObjectArr[i].setHours(0,0,0,0);
  }
}

function checkAlertExpiration(SHEET_DATA) {
  const d = new Date();
  const START = new Date(SHEET_DATA[4]);
  const END = new Date(SHEET_DATA[5]);

  zeroDatesTime([d, START, END]);

  const alertIsActiveAndNotExpired = START.getTime() <= d.getTime() && END.getTime() > d.getTime();

  alertIsActiveAndNotExpired ? createHTML(SHEET_DATA) : null;
}

function init(SHEET_DATA) {
  const ALERT_HAS_EXPIRATION = SHEET_DATA[3] === 'TRUE';

  ALERT_HAS_EXPIRATION ? checkAlertExpiration(SHEET_DATA) : createHTML(SHEET_DATA);
}

function checkAlertPages(SHEET_DATA) {
  const DISPLAY_ALERT_ON_ALL_PAGES_CELL = SHEET_DATA[1];
  const pathname = window.location.pathname;
  const locationIsHomepage = pathname === '/';
  const displayAlertOnAllPagesIsTrue = DISPLAY_ALERT_ON_ALL_PAGES_CELL === 'TRUE';

  if ( ! displayAlertOnAllPagesIsTrue ) {
    locationIsHomepage ? init(SHEET_DATA) : null;
  } else {
    init(SHEET_DATA);
  }
}

function createAlertsHtml(response) {  // Incoming response from our Google Sheet via the Sheets API
  const SHEET_CELL_VALUES_ARRAY = response.result.values;  // Requires `response` to be defined.
  const SHEET_DATA = SHEET_CELL_VALUES_ARRAY[2];
  const ALERT_VISIBILITY_CELL = SHEET_DATA[0];
  const ALERT_VISIBILITY_IS_FALSE = ALERT_VISIBILITY_CELL === FALSE_FROM_SHEETS;

  if ( ALERT_VISIBILITY_IS_FALSE )
    return;

  checkAlertPages(SHEET_DATA);
}

export default createAlertsHtml;
