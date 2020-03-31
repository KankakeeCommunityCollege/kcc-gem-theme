import setSheetParameters from './simpleSetSheetParameters.js';
import createAlertsHtml from './createAlertsHtml.js';

const SHEET_KEY = '1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs';
const SHEET_TAB_NAME = 'Alerts Testing';
const EMERGENCY_ALERT_DIV_ID = 'emergencyAlerts'

function start() {
  if ( ! document.getElementById(EMERGENCY_ALERT_DIV_ID) )
    return;

  //var t0 = performance.now();
  init();
  //var t1 = performance.now();
  //console.info("Call to 'init' took " + (t1 - t0) + " milliseconds.");
}

function init() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  const sheetParams = setSheetParameters(SHEET_KEY, SHEET_TAB_NAME);

  gapi.client.init(params).then(function() { // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.values.get(sheetParams)
        .then(function(response) {
          createAlertsHtml(response);
        },
        function(err) {
          console.error("Execute error", err);
        });
    }
    execute();
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
