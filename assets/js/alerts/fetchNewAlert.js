const SHEET_KEY = '1plXBiZY5pVbhNT-mszxEuqCl4zy8wMnz9gXXbbT_yLs'; // Corresponds to the ID of the Google Sheet
const SHEET_TAB = 'Alerts'; // Corresponds to the tab of workbook: either  'Alerts' or 'Alerts Testing' unless you make a new one.
const EMERGENCY_ALERT_DIV_ID = 'emergencyAlerts'
const SHEET_PARAMS = {spreadsheetId: SHEET_KEY, range: SHEET_TAB};  // Configures the Object used for `sheets.spreadsheets.values.get()` parameters
const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

function fetchNewAlert() {
  gapi.client.init(API_PARAMS).then(() => {
    return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS)
  }).then(response => {
    import('./createAlertsHtml').then(({default: createAlertsHtml}) => {
      createAlertsHtml(response, undefined);
    });
    return response;
  }).then(response => {
    import('./cacheResponse').then(({default: cacheResponse}) => {
      cacheResponse(response);
    })
  }, err => {
    console.error('Error fetching new alert from gapi:', err);
  })
}

export default fetchNewAlert;
