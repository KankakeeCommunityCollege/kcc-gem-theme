// Custom JS to make a Google API call to the alerts spreadsheet
// Then paint the alert into the DOM using module `./createAlertsHtml.js`
//
const SHEET_PARAMS = {
  spreadsheetId: '1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs',
  range: 'Alerts'
};  // Configures the Object used for `sheets.spreadsheets.values.get()` parameters
const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

function fetchNewAlert() {
  gapi.client.init(API_PARAMS).then(() => {
    return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS); // Get the new values from the spreadsheet
  }).then(response => {
    import('./createAlertsHtml').then(({default: createAlertsHtml}) => {
      // Since everything in the page has already loaded, `createAlertsHtml()` can be lazily loaded w/ ES6 import()
      // createAlertsHtml expects 2 args: 1.) `response` object and 2.) either `resolve()` (from `./alert.js`) or `undefined`
      createAlertsHtml(response, undefined); // We don't need to resolve a promise this time so use `undefined` as 2nd arg
    });
    return response;
  }).then(response => {
    import('./cacheResponse').then(({default: cacheResponse}) => {
      // Lazy load cacheResponse() using ES6 imports() w/ Webpack 5
      cacheResponse(response);
    })
  }, err => {
    console.error('Error fetching new alert from gapi:', err);
  });
}

export default fetchNewAlert;
