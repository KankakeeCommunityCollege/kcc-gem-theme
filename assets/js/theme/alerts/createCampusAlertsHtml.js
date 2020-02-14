// Custom JS to build an alert message using data coming from a Google Sheets (Using the Sheets API v4)
// ==================================================================================
// This exported module requires you pass the function the `response` object from the API call,
// and `resolve()` from the Promise that the function call is wrapped in (see './campusAlertsSheetsAPI.js')

const CAMPUS_ALERTS_ID_STRING = 'campusAlerts';  // ID of the div to house campus alerts - already built into the page.
const BOOTSTRAP_CONTAINER_FLUID_CLASS = 'container-fluid';  // Class used in Bootstrap 4
const BOOTSTRAP_ROW_CLASS = 'row';  // Class used in Bootstrap 4
const BOOTSTRAP_COL_CLASS = 'col';  // Class used in Bootstrap 4
const BOOTSTRAP_CLOSE_CLASS = 'close';  // Class used in Bootstrap 4
const FALSE_FROM_SHEETS = 'FALSE';  // Because Google Sheets does 'TRUE' & 'FALSE' in all caps, unlike JavaScript
const NO_BOTTOM_MARGIN_CLASS = 'margins__bottom--none';  // A class from the kcc-gem-theme's stylesheet
const BOOTSTRAP_ALERT_CLASS_ARRAY = ['alert', 'alert-warning', 'alert-dismissible', 'fade', 'show', 'campus-alerts__margin-bottom']; // all BS4 classes except the last BEM-ey one
const INHERET_COLOR_CLASS = 'typography__color--inherit';

function loopOverClassArguments(el, classArguments) {
  for (var i = 0, len = classArguments.length; i < len; i++) {
    el.classList.add(classArguments[i]);
  }
  return el;
}

function addClassestoElement(el, classArgument) {
  const classArgumentIsString = typeof classArgument === 'string';
  const classArgumentIsIterable = typeof classArgument === 'object';
  // Terns are seabirds in the family Laridae that have a worldwide distribution and are normally found near the sea
  classArgumentIsString ? el.classList.add(classArgument)
  : classArgumentIsIterable ? loopOverClassArguments(el, classArgument)
  : null;
}

function appendParentWithDiv(parent, classArgument) {
  const div = document.createElement('div');

  addClassestoElement(div, classArgument);
  parent.appendChild(div);
  return div;
}

function setAttributeOnElement(el, attribute, value) {
  el.setAttribute(attribute, value);
  return el;
}

function replaceCaptureGroups(string, regEx, replacement) {
  const replacedString = string.replace(regEx, replacement);
  return replacedString;
}

function markdownify(string) {
  const MARKDOWN_TO_HTML_REGEX_OBJECT = {
    '<strong>$<strongContent></strong>': /\*\*(?<strongContent>[^*]+)\*\*/g,
    '<em>$<emContent></em>': /_(?<emContent>[^_]+)_/g,
    '<a href="$<href>" target="_blank" rel="noopener noreferrer">$<linkText><a>': /\[(?<linkText>[^\]]+)\]\((?<href>[^\)]+)\)/g
  };

  for (var key in MARKDOWN_TO_HTML_REGEX_OBJECT) {
    if (MARKDOWN_TO_HTML_REGEX_OBJECT.hasOwnProperty(key)) {
      string = replaceCaptureGroups(string, MARKDOWN_TO_HTML_REGEX_OBJECT[key], key);
    }
  }
  return string;
}

function createAlertParagraph(parentElement, messageText) {
  const p = document.createElement('p');

  p.classList.add(NO_BOTTOM_MARGIN_CLASS, INHERET_COLOR_CLASS);
  p.innerHTML = markdownify(messageText);
  parentElement.appendChild(p);
  return p;
}

function setAttributesFromObject(el, attributeObject) {
  for(var key in attributeObject) {
    el.setAttribute(key, attributeObject[key]);
  }
  return el;
}

function closeAlertClickHandler() {
  const campusAlertsDiv = closeAlertClickHandler.alert_parent_element;

  campusAlertsDiv.classList.remove('position__campus-alerts--open');
}

function addEventListenerToElement(el, listener, handler) {
  el.addEventListener(listener, handler);
}

function createBootstrapCloseAlertButton(parent, resolve) {
  const button = document.createElement('button');
  const span = document.createElement('span');

  button.classList.add(BOOTSTRAP_CLOSE_CLASS);
  addEventListenerToElement(button, 'click', closeAlertClickHandler)
  setAttributesFromObject(button, {
    'type': 'button',
    'data-dismiss': 'alert',
    'aria-label': 'close'
  })  // Attributes need from Bootstrap 4 Documentation on alerts
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = '&times;';
  button.appendChild(span);
  parent.appendChild(button);
  resolve();  // Signals async completion for `createCampusAlertsPromise` in `./campusAlertsSheetsAPI.js`
  return button;
}

function setDateTimesToZero(d) {
  d.setHours(0,0,0,0);
  return d;
}

function initCreateCampusAlerts(firstRow, resolve) {
  const ALERT_MESSAGE_CELL_VALUE = firstRow[1];
  const campusAlertsDiv = document.getElementById(CAMPUS_ALERTS_ID_STRING);
  const container = appendParentWithDiv(campusAlertsDiv, BOOTSTRAP_CONTAINER_FLUID_CLASS);
  const alert = appendParentWithDiv(container, BOOTSTRAP_ALERT_CLASS_ARRAY);
  const p = createAlertParagraph(alert, ALERT_MESSAGE_CELL_VALUE);
  const closeButton = createBootstrapCloseAlertButton(alert, resolve);

  closeAlertClickHandler.alert_parent_element = campusAlertsDiv;
  setAttributeOnElement(alert, 'role', 'alert');
  campusAlertsDiv.classList.add('position__campus-alerts--open');
}

function createCampusAlertsHtml(response, resolve) {
  const INCOMING_DATA = response.result.values;
  const FIRST_ROW_OF_DATA = INCOMING_DATA[2];
  const ALERTS_VISIBLE_CELL_VALUE = FIRST_ROW_OF_DATA[0];
  //console.log(response.result.values);

  if ( ALERTS_VISIBLE_CELL_VALUE === FALSE_FROM_SHEETS )
    return;// If alerts are set to be hidden, there's no point in executing the rest of the code (bail-out).

  const ALERT_EXPIRATION_CELL_VALUE = FIRST_ROW_OF_DATA[2]; // defined after above-return statement to prevent errors if it's not there.

  if (ALERT_EXPIRATION_CELL_VALUE !== FALSE_FROM_SHEETS) {
    const start = new Date(FIRST_ROW_OF_DATA[3]);
    const end = new Date(FIRST_ROW_OF_DATA[4]);
    const now = new Date();
    const today = setDateTimesToZero(now);

    if ( start.getTime() <= today.getTime() && end.getTime() > today.getTime() ) {
      initCreateCampusAlerts(FIRST_ROW_OF_DATA, resolve);
    } else {
      return;
    }
  } else {
    initCreateCampusAlerts(FIRST_ROW_OF_DATA, resolve);
  }

}
//
//  USAGE:
//    import createCampusAlertsHtml from './createCampusAlertsHtml.js';
//
//    // ...
//    // Google Sheets API call code above
//    .then(function(response) {
//      let createTablePromise = new Promise((resolve, reject) => {
//
//    createCampusAlertsHtml(response, resolve); // Where response is the `response` object from the Sheets API and resolve is from the promise constructed before calling this export
//    });
export default createCampusAlertsHtml;
