// Custom JS to make the site look pretty while ITS shrinks and expands the window with the menu open
const NAV_ELEMENT_ID_STRING = 'headerGlobalNavbar';  // ID built into the site's HMTL
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent';  // ID built into the sites' HTML
const GLOBAL_NAVIGATION_ITEMS = 'navGlobalBottom';  // ID built into the site's HMTL
const NAVBAR_ELEMENT = document.getElementById(NAV_ELEMENT_ID_STRING);  // The <nav> element built into the site's HMTL
const BOOTSTRAP_COLLAPSE_SHOW_CLASS_STRING = 'show';
const BOOTSTRAP_DROPDOWN_TOGGLER_CLASS = '.dropdown-toggle'; // Class specific to Bootstrap 4 code

function openNavigationCollapse() {

  if ( NAVBAR_ELEMENT.navbar_toggled === true )  // Track if the navbar has already been toggled
    return; // Bail-out to prevent repetitive calls to the code below (without this the code is called many, many, many times while the screen is resizing)

  const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);

  NAVBAR_ELEMENT.navbar_toggled = true;
  $(menuCollapseElement).collapse(BOOTSTRAP_COLLAPSE_SHOW_CLASS_STRING);  // BOOTSTRAP 4 METHOD (requires jQuery (yuck!).)!!! Official BS4 docs on `.collapse()` https://getbootstrap.com/docs/4.4/components/collapse/#via-javascript
}

function checkForOpenDropdownMenus(menuItem) {
  const dropdown = menuItem.parentElement;

  if ( dropdown.classList.contains(BOOTSTRAP_COLLAPSE_SHOW_CLASS_STRING) ) {
    openNavigationCollapse();
  }
}

function loopOverDropdownItems(nodeList) {
  let len = nodeList.length;

  for (var i = 0; i < len; i++) {
    checkForOpenDropdownMenus(nodeList[i]);
  }
}

function windowResizeHandler() {
  const dropdownToggleNodeList = document.getElementById(GLOBAL_NAVIGATION_ITEMS).querySelectorAll(BOOTSTRAP_DROPDOWN_TOGGLER_CLASS);

  if ( window.innerWidth <= 992 ) {
    loopOverDropdownItems(dropdownToggleNodeList);
  } else {
    NAVBAR_ELEMENT.navbar_toggled = false;
  }
}

function toggleDropdownOnWindowResize() {

  if ( ! NAVBAR_ELEMENT )
    return;

  window.addEventListener('resize', windowResizeHandler);
}

export default toggleDropdownOnWindowResize;
