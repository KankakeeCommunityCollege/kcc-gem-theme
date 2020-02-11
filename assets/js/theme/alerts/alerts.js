import gapiInit from './gapi.js';
import start from './campusAlertsSheetsAPI.js';

document.addEventListener('DOMContentLoaded', function() {
  gapiInit('client', start);
});
