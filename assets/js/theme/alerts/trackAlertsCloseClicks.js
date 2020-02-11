// Custom JS to track if the user has closed the alert already using HTML5 storageSessions
const CAMPUS_ALERTS_ID_STRING = 'campusAlerts';

function clickCounter() {
  if (sessionStorage.clickcount) {
    sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
  } else {
    sessionStorage.clickcount = 1;
  }
}

function addEventListenerToElement(el, event, handler) {
  el.addEventListener(event, handler);
}

function trackAlertsCloseClicks() {
  const alertDiv = document.getElementById(CAMPUS_ALERTS_ID_STRING);

  if ( ! alertDiv.querySelector('button.close') )
    return;

  const closeAlertsButton = alertDiv.querySelector('button.close');
  addEventListenerToElement(closeAlertsButton, 'click', clickCounter);
}

export default trackAlertsCloseClicks;
