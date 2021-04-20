/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
//  1. Execute Google API call to grab Google Sheet data from:
//     https://docs.google.com/spreadsheets/d/1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs/edit#gid=0
//  2. Build & inject the alert message into the page
//  3. Run the `contentHashLink` module after alert has painted into DOM (and altered documents hight)
//  4. Cache the API response in sessionStorage
// =================================================== //
import setSheetParameters from './simpleSetSheetParameters.js';
import createAlertsHtml from './createAlertsHtml.js';
import contentHashLink from './contentHashLink.js';
import cacheResponse from './cacheResponse.js';

const SHEET_KEY = '1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs'; // Corresponds to the ID of the Google Sheet
const SHEET_TAB = 'Alerts'; // Corresponds to the tab of workbook: either  'Alerts' or 'Alerts Testing' unless you make a new one.
const EMERGENCY_ALERT_DIV_ID = 'emergencyAlerts'
const SHEET_PARAMS = setSheetParameters(SHEET_KEY, SHEET_TAB);  // Configures the Object used for `sheets.spreadsheets.values.get()` parameters
const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

function init() {
  gapi.client.init(API_PARAMS).then(() => { // Executes an API request, and returns a Promise.
    return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS)
  }).then((response) => {
    createAlertsHtml(response); // Build the html & inject it into the DOM
    return response;
  }).then((response) => {
    cacheResponse(response); // Cache the Google API response for subsequent page loads in the site
  }, (err)=> {
    console.error("Execute error", err);
    contentHashLink();
  });
}

function start() {
  if ( ! document.getElementById(EMERGENCY_ALERT_DIV_ID) )
    return contentHashLink();

  init();
  //var t1 = performance.now();
  //console.info("Call to 'init' took " + (t1 - t0) + " milliseconds.");
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
