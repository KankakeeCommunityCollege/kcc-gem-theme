// Custom JS to track if the user has closed the alert already using HTML5 storageSessions
const CAMPUS_ALERTS_ID_STRING = 'campusAlerts';

function addAttributeToElement(el, attr, val) {
  el.setAttribute(attr, val);
}

function trackAlertsCloseClicks() {
  if ( ! document.getElementById(CAMPUS_ALERTS_ID_STRING) )
    return;

  // Set the initial click count
  if( sessionStorage.clickcount == undefined ) {  // if the clickcount is undefined:
    sessionStorage.clickcount = 0;  // set the clickcount to 0:
  }

  // Add the click count to the element as an attribute
  const campusAlertDiv = document.getElementById(CAMPUS_ALERTS_ID_STRING);
  addAttributeToElement(campusAlertDiv, 'data-close', sessionStorage.clickcount)

  // A counter function
  function clickCounter() {
    if(typeof(Storage) !== 'undefined') {
      if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
      } else {
        sessionStorage.clickcount = 1;
      }
      smileWrapper.attr('data-close', sessionStorage.clickcount);
    }
  }
}

export default trackAlertsCloseClicks;
