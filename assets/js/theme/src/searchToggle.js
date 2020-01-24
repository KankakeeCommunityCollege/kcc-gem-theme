// Custom JS to toggle the search form
const FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR = [
  '#gsc-i-id1',
  '#gs_st50 .gsst_a',
  '.gsc-search-button .gsc-search-button.gsc-search-button-v2'
]; // Elements that Google Custom Search builds into the page
const OPEN_SEARCH_BUTTON_ID = 'openSearchButton';
const OPEN_SEARCH_BUTTON_CLASS = 'header-global__search-icon';
const CLOSE_SEARCH_BUTTON_ID = 'closeSearchButton';
const CLOSE_SEARCH_BUTTON_CLASS = 'header-global__close-icon';
const SEARCH_INPUT_ID = 'gsc-i-id1';  // An element that Google Custom Search builds into the page
const HEADER_GLOBAL_NAV_ID = 'headerGlobalNavbar';
const SEARCH_COLLAPSE_ID = 'searchCollapse';

function setElementAttribute(selector, attr, val) {
  const el = document.querySelector(selector);

  el.setAttribute(attr, val);
}

function toggleButtonAttributes(button, removeButtonOption, buttonClass) {
  if ( removeButtonOption ) {
    button.classList.add(buttonClass + '--hidden');
    button.setAttribute('aria-hidden', 'true');
    button.setAttribute('tabindex', '-1');
  } else {
    button.classList.remove(buttonClass + '--hidden');
    button.setAttribute('aria-hidden', 'false');
    button.setAttribute('tabindex', '0');
  }
}

function handleSearchToggle(searchButtonWasClicked) {
  const searchButtonEl = document.getElementById(OPEN_SEARCH_BUTTON_ID);
  const closeButtonEl = document.getElementById(CLOSE_SEARCH_BUTTON_ID);
  const searchInputField = document.getElementById(SEARCH_INPUT_ID);
  let len = FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR.length;

  if ( searchButtonWasClicked ) {
    toggleButtonAttributes(searchButtonEl, true, OPEN_SEARCH_BUTTON_CLASS);
    toggleButtonAttributes(closeButtonEl, false, CLOSE_SEARCH_BUTTON_CLASS);
    for (var i = 0; i < len; i++) {
      setElementAttribute(FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR[i], 'tabindex', '0');
    }
    searchInputField.focus();
  } else {
    toggleButtonAttributes(searchButtonEl, false, OPEN_SEARCH_BUTTON_CLASS);
    toggleButtonAttributes(closeButtonEl, true, CLOSE_SEARCH_BUTTON_CLASS);
    for (var i = 0; i < len; i++) {
      setElementAttribute(FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR[i], 'tabindex', '-1');
    }
  }
}

function toggleOtherElements() {
  const searchCollapse = document.getElementById(SEARCH_COLLAPSE_ID);
  const headerGlobalNavbar = document.getElementById(HEADER_GLOBAL_NAV_ID);
  const collapseAria = searchCollapse.getAttribute('aria-hidden');

  searchCollapse.classList.toggle('header-global__search-collapse--visible');
  (collapseAria === "true") ? searchCollapse.setAttribute('aria-hidden', 'false') : searchCollapse.setAttribute('aria-hidden', 'true');
  headerGlobalNavbar.classList.toggle('header-global__navbar--search-toggle');
}

function checkClickedButton(event) {
  let openSearchButtonWasClicked;

  if ( event.target.closest('#openSearchButton') ) {
    openSearchButtonWasClicked = true;
  } else if ( event.target.closest('#closeSearchButton') ) {
    openSearchButtonWasClicked = false;
  }
  handleSearchToggle(openSearchButtonWasClicked);
  toggleOtherElements();
}

function clickEventHandler(event) {
  if ( event.target.closest('#openSearchButton') || event.target.closest('#closeSearchButton') ) {
    checkClickedButton(event);
  } else {
    return; // Bail-out
  }
}

function addClickEventListener() {
  document.addEventListener('click', clickEventHandler);
}

function initSearchToggle() {
  if ( ! document.getElementById('openSearchButton') )
    return;

  addClickEventListener();
}

export default initSearchToggle;
