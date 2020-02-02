import setSheetParameters from './simpleSetSheetParameters.js';
import createCampusAlertsHtml from './createCampusAlertsHtml.js';
import trackAlertsCloseClicks from './trackAlertsCloseClicks.js';

const SHEET_KEY = '1IF8WbIYeEtF0C6YQjgpdVoivXb54uGbKaSxEF46Wbs4';
const SHEET_TAB_NAME = 'Alerts';

function start() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  const sheetParams = setSheetParameters(SHEET_KEY, SHEET_TAB_NAME);
  //console.log(sheetParams);
  gapi.client.init(params).then(function() { // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.values.get(sheetParams)
        .then(function(response) {
          let createCampusAlertsPromise = new Promise((resolve, reject) => {
            // Do stuff with the response here
            // returned array of arrays w/ values = response.result.values
            createCampusAlertsHtml(response, resolve);
          });
          createCampusAlertsPromise.then(() => {
            // Do stuff after you handled the response here
            //console.log('createCampusAlertsPromise has resolved');
            trackAlertsCloseClicks();
          });
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
