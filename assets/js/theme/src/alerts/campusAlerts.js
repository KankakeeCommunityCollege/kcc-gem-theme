const EMERGENCY_ALERTS_ID = 'emergencyAlerts';

function initCampusAlerts() {
  if ( document.getElementById(EMERGENCY_ALERTS_ID) ) {
    import(/* webpackChunkName: 'start' */ './campusAlertsSheetsAPI.js').then(({ default: start })=> {
      gapi.load('client', start);
    });
  }
}

export default initCampusAlerts;