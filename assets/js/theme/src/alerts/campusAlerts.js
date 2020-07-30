function initCampusAlerts() {
  if ( document.getElementById('emergencyAlerts') ) {
    import(/* webpackChunkName: 'start' */ './campusAlertsSheetsAPI.js').then(({ default: start })=> {
      gapi.load('client', start);
    });
  }
}

export default initCampusAlerts;