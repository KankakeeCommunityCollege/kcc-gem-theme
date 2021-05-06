const QUERYSELECTOR_IN_LANDING_PAGES = 'nav.nav-landing'  // <nav> element in landing pages
const FORM_WRAPPER_QUERYSELCTOR = 'div.wFormContainer'  // <div> element from TargetX form in landing pages
const GET_STARTED_BUTTON_QUERYSELECTOR = 'a[href="#page-top"]';  // call-to-action Button at the bottom of landing pages
const FIRST_NAME_INPUT_QUERYSELECTOR = '.inputWrapper input[placeholder="First Name"]';  // First Name <input> element from the TargetX form in landing pages
// Custom JS to scroll the user to the top of the page & focus the first field (First Name input) of the form

function selectInputEl(inputElQuerySelctorString) {
  const inputEl = document.querySelector(inputElQuerySelctorString);

  return inputEl.select();
}

function distanceToTop(el) {
  return Math.floor(el.getBoundingClientRect().top);
}

function clickHandler(e) {
  const targetId = e.target.getAttribute('href').replace(/^#/, '');
  const targetEl = document.getElementById(targetId);
  const originalTop = distanceToTop(targetEl);

  e.preventDefault();
  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

  const checkIfDone = setInterval(function() {
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetEl) === 0 || atBottom) {
      selectInputEl(FIRST_NAME_INPUT_QUERYSELECTOR);
      clearInterval(checkIfDone);
    }
  }, 100);
}

function addClickEventListener(querySelectorString) {
  const el = document.querySelector(querySelectorString);

  el.addEventListener('click', clickHandler)
}

function landingPageInit() {
  const requiredPageElements = document.querySelector(QUERYSELECTOR_IN_LANDING_PAGES) && document.querySelector(FORM_WRAPPER_QUERYSELCTOR) && document.querySelector(GET_STARTED_BUTTON_QUERYSELECTOR) && document.querySelector(FIRST_NAME_INPUT_QUERYSELECTOR);

  if ( ! requiredPageElements )
    return;

  addClickEventListener(GET_STARTED_BUTTON_QUERYSELECTOR);
}

export default landingPageInit;
