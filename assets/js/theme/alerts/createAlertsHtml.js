/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
// JS module to build alert message using data from Google Sheets API v4
//
// This exported module requires you pass it's default-function the `response` object from the API call, as the only argument
import makeTabsLinkable from './tabLink.js';
import parseMarkdownToHTML from './parseMarkdownToHTML.js';
//
const CAMPUS_ALERTS_DIV_ID_STRING = 'emergencyAlerts';  // ID of the div to house campus alerts - already built into the page.
const BOOTSTRAP_CONTAINER_CLASS = 'container';  // Class used in Bootstrap 4
const BOOTSTRAP_ROW_CLASS = 'row';  // Class used in Bootstrap 4
const BOOTSTRAP_COL_CLASS = 'col';  // Class used in Bootstrap 4
const BOOTSTRAP_CLOSE_CLASS = 'close';  // Class used in Bootstrap 4
const TRUE_FROM_SHEETS = 'TRUE';  // Because Google Sheets does 'TRUE' & 'FALSE' in all caps, unlike JavaScript
const FALSE_FROM_SHEETS = 'FALSE';  // Because Google Sheets does 'TRUE' & 'FALSE' in all caps, unlike JavaScript
const BOOTSTRAP_ALERT_CLASS_ARRAY = ['alert', 'alert-warning']; // BS4 classes for alerts
const ALERTS_VISIBLE_CLASS = 'position__offset-alert--visible';

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
  const DOM_TARGET = document.getElementById(CAMPUS_ALERTS_DIV_ID_STRING); // This targets an element built into the DOM that we inject everything into.
  const MESSAGE = parseMarkdownToHTML(SHEET_DATA[2]); // The third cell, or third item, in the array
  const container = appendElementWithNewNode(DOM_TARGET, 'div', BOOTSTRAP_CONTAINER_CLASS);
  const row = appendElementWithNewNode(container, 'div', BOOTSTRAP_ROW_CLASS);
  const col = appendElementWithNewNode(row, 'div', BOOTSTRAP_COL_CLASS);
  const alertDiv = appendElementWithNewNode(col, 'div', BOOTSTRAP_ALERT_CLASS_ARRAY);

  alertDiv.innerHTML = MESSAGE;
  DOM_TARGET.classList.add(ALERTS_VISIBLE_CLASS);
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
  const ALERT_HAS_EXPIRATION = SHEET_DATA[3] === TRUE_FROM_SHEETS;

  ALERT_HAS_EXPIRATION ? checkAlertExpiration(SHEET_DATA) : createHTML(SHEET_DATA);
}

function checkAlertPages(SHEET_DATA) {
  const DISPLAY_ALERT_ON_ALL_PAGES = SHEET_DATA[1] === TRUE_FROM_SHEETS; // Second cell toggles if it displays on just homepages or all pages of the sites
  const pathname = window.location.pathname;
  const locationIsHomepage = pathname === '/';

  if ( ! DISPLAY_ALERT_ON_ALL_PAGES ) {
    locationIsHomepage ? init(SHEET_DATA) : null;
  } else {
    init(SHEET_DATA);
  }
}

function createAlertsHtml(response) {  // Incoming response from our Google Sheet via the Sheets API
  if ( ! document.getElementById(CAMPUS_ALERTS_DIV_ID_STRING) )
    return makeTabsLinkable();

  // This is where the cell values hide in the response object from the Google API.
  const SHEET_CELL_VALUES_ARRAY = response.result.values; // `values` is an array consisting of an array for each row (i.e an array of arrays)
  const SHEET_DATA = SHEET_CELL_VALUES_ARRAY[2]; // Selecting the third row of the values array. This is where all the important options/data are in the Google Sheet
  const ALERT_VISIBILITY_IS_FALSE = SHEET_DATA[0] === FALSE_FROM_SHEETS; // First cell(SHEET_DATA[0]) is to toggle the alert's visibility.
  if ( ALERT_VISIBILITY_IS_FALSE )
    return;

  checkAlertPages(SHEET_DATA);
}

export default createAlertsHtml;
