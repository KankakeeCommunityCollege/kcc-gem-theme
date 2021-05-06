// Custom JS to Close the Navigation menu, if its open, & if the screen goes above 992px wide (Bootstrap 4 'lg' devices)
const SEARCH_COLLAPSE_ID = 'searchCollapse'; // ID built into the sites' HTML
const SEARCH_COLLAPSE_IS_VISIBLE_CLASS = 'nav-global__search-collapse--visible'; // Class in the HTML when the search collapse is open/visible
const GLOBAL_NAV_ID = 'globalNav';
const LOCAL_NAV_ID = 'mainNav';
const GLOBAL_NAV_SEARCH_IS_VISIBLE_CLASS = 'nav-global__search-toggle';
const LOCAL_NAV_SEARCH_IS_VISIBLE_CLASS = 'nav-local__search-toggle';
const SEARCH_ICON_ID = 'searchIcon';
const SEARCH_ICON_SPAN_QUERY_SELECTOR = '#searchImg';

function removeClassFromElement(el, classToRemove) {
  el.classList.remove(classToRemove);
}

function checkElementCollapseState(el, classToCheckFor) {
  if ( ! el.classList.contains(classToCheckFor) )
    return;

  removeClassFromElement(el, classToCheckFor);
}

function toggleSearchIconToX(el) {
  const span = el.querySelector(SEARCH_ICON_SPAN_QUERY_SELECTOR);

  el.setAttribute('aria-label', 'Toggle Search');
  span.setAttribute('alt', 'Open icon');
  span.setAttribute('style', 'background-image: url("/assets/img/search.svg")');
}

function checkSearchToggleIcon(el) {
  let ariaLabel = el.getAttribute('aria-label');

  if ( ! ariaLabel === 'Toggle Close' )
    return;

  toggleSearchIconToX(el)
}

function windowResizeHandler() {
  if ( window.innerWidth >= 992 ) {
    const searchCollapseElement = document.getElementById(SEARCH_COLLAPSE_ID);
    const globalNav = document.getElementById(GLOBAL_NAV_ID);
    const localNav = document.getElementById(LOCAL_NAV_ID);
    const searchIcon = document.getElementById(SEARCH_ICON_ID);

    checkElementCollapseState(searchCollapseElement, SEARCH_COLLAPSE_IS_VISIBLE_CLASS);
    checkElementCollapseState(globalNav, GLOBAL_NAV_SEARCH_IS_VISIBLE_CLASS);
    checkElementCollapseState(localNav, LOCAL_NAV_SEARCH_IS_VISIBLE_CLASS);
    checkSearchToggleIcon(searchIcon);
  }
}

function toggleSearchDropdownOnWindowResize() {
  window.addEventListener('resize', windowResizeHandler);
}

export default toggleSearchDropdownOnWindowResize;
