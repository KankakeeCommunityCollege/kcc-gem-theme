const url = window.location.href.replace(/^http:\/\/|^https:\/\//, '').replace(window.location.host, '');

function setSessionStorage() {  // Set the initial click count for tracking when the alert has been closed
  if( sessionStorage.clickcount == undefined ) {
    sessionStorage.clickcount = 0;
  }
}

function gapiInit(param1, param2) {

  if ( url != '/' )
    return;

  setSessionStorage();

  if ( sessionStorage.clickcount != undefined && sessionStorage.clickcount >= 1 )
    return; // If the user has already closed the alert, do not execute the Google API call again.

  gapi.load(param1, param2);
}

export default gapiInit;
