/*
// Custom JS | written by https://github.com/wdzajicek
// © 2020 Kankakee Community College
// =================================================== */
// import start from './campusAlertsSheetsAPI.js';
import createAlertsHtml from './createAlertsHtml';
import cacheResponse from './cacheResponse';
import getCachedResponse from './getCachedResponse';
import checkForPrefersReducedMotion from './checkForPrefersReducedMotion';
import checkForAccordionOrTab from './checkForAccordionOrTab';

const SHEET_KEY = '1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs'; // Corresponds to the ID of the Google Sheet
const SHEET_TAB = 'Alerts'; // Corresponds to the tab of workbook: either  'Alerts' or 'Alerts Testing' unless you make a new one.
const EMERGENCY_ALERT_DIV_ID = 'emergencyAlerts'
const SHEET_PARAMS = {spreadsheetId: SHEET_KEY, range: SHEET_TAB};  // Configures the Object used for `sheets.spreadsheets.values.get()` parameters
const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

function loadModule(module) {
  import(`./${module}`).then(({default: module}) => module())
}

document.addEventListener('DOMContentLoaded', () => {
  checkForPrefersReducedMotion();

  if (!document.getElementById('emergencyAlerts'))
    return checkForAccordionOrTab()

  new Promise((resolve, reject) => { // First build the alert, whether by cache or API call
    if (! window.sessionStorage.getItem('Alert-Content')) { // If cache exists there will be an `Alert-Content` key in `sessionStorage` (which gets set in `./cacheResponse.js`)
      gapi.load('client', () => {
        gapi.client.init(API_PARAMS).then(() => {
          return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
        }).then(response => {
          createAlertsHtml(response, resolve) // Promise is resolved after HTML alert is built
          return response;
        }).then(response => {
          cacheResponse(response);
        }, err => {
          console.error("Error trying to fetch the alert from gapi:", err);
        })
      });
    } else {
      getCachedResponse(resolve); // Promise is resolved after HTML alert is built
    }
    // ! window.sessionStorage.getItem('Alert-Content') ? // Checks if our cached alert is already in sessionStorage
    //     gapi.load('client', start) // If not, build the alert from a new Google API response
    // : getCachedResponse(); // Otherwise, build the alert from our cached response
  }).then(() => {
      loadModule('refreshAlertButton')
    }); // Allow user to refresh the alert (and check for changes/updates)
});
