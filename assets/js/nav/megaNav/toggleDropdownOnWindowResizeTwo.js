// Custom JS to make the site look pretty while ITS shrinks and expands the window with the menu open
const NAV_ELEMENT_ID_STRING = 'headerGlobalNavbar';  // ID built into the site's HMTL
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent';  // ID built into the sites' HTML
const GLOBAL_NAVIGATION_ITEMS = 'navGlobalBottom';  // ID built into the site's HMTL
const NAVBAR_ELEMENT = document.getElementById(NAV_ELEMENT_ID_STRING);  // The <nav> element built into the site's HMTL
const BOOTSTRAP_COLLAPSE_SHOW_CLASS_STRING = 'show';
const BOOTSTRAP_DROPDOWN_TOGGLER_CLASS = '.dropdown-toggle'; // Class specific to Bootstrap 4 code

function toggleDropdownOnWindowResize(Collapse) {

  if ( ! NAVBAR_ELEMENT )
    return;

  function openNavigationCollapse() {

    if ( NAVBAR_ELEMENT.navbar_toggled === true )  // Track if the navbar has already been toggled
      return; // Bail-out to prevent repetitive calls to the code below (without this the code is called many, many, many times while the screen is resizing)

    const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);
    const bsCollapse = new Collapse(menuCollapseElement, {toggle: false});

    NAVBAR_ELEMENT.navbar_toggled = true;
    bsCollapse.show();
  }

  function checkForOpenDropdownMenus(menuItem) {
    const dropdown = menuItem.parentElement;

    if ( dropdown.classList.contains(BOOTSTRAP_COLLAPSE_SHOW_CLASS_STRING) ) {
      openNavigationCollapse();
    }
  }

  function windowResizeHandler() {
    const dropdownToggleNodeList = document.getElementById(GLOBAL_NAVIGATION_ITEMS).querySelectorAll(BOOTSTRAP_DROPDOWN_TOGGLER_CLASS);

    if ( window.innerWidth <= 992 ) {
      dropdownToggleNodeList.forEach(checkForOpenDropdownMenus);
    } else {
      NAVBAR_ELEMENT.navbar_toggled = false;
    }
  }

  window.addEventListener('resize', windowResizeHandler);
}

export default toggleDropdownOnWindowResize;
