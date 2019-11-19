const SLIDE_HEADING_ELEMENTS = document.querySelectorAll('.hero-slider__slider--slide-heading'); // Element from HTML
const regEx = /\*\*(\S+)\*\*/g;
const replacement = '<span class="typography__power-text">$1</span>';

function replaceRegex(el) {
  return el.innerHTML = el.innerHTML.replace(regEx, replacement);
}

function loopOverNodeList(nodeList) {
  for (var i = 0; i < nodeList.length; i++) {
    replaceRegex(nodeList[i]);
  }
}

function wrapPowerText() {
  if ( !document.querySelectorAll('.hero-slider__slider--slide-heading') )
    return; // Bail out of theres no slider in the page.
  loopOverNodeList(SLIDE_HEADING_ELEMENTS);
}

export default wrapPowerText;
