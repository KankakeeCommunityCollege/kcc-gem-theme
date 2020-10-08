//
//
//
//  TODO: Combine method bellow with a class added to the nav when it is desktop size and above
//
//
//
//
//
// Custom JS to Close the Navigation menu, if its open, & if the screen goes above 992px wide (Bootstrap 4 'lg' devices)
const NAV_ELEMENT_ID_STRING = 'headerGlobalNavbar';
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent'; // ID built into the sites' HTML
const NAVBAR_IS_DESKTOP = 'header-global__navbar--lg';
const NAVBAR_ELEMENT = document.getElementById(NAV_ELEMENT_ID_STRING);

function removeClassFromElement(el, classString) {
  el.classList.remove(classString);
}

function collapseElement(dropdownToggle) {
  //console.log( $(dropdownToggle) );
  $(dropdownToggle).collapse('hide'); // Bootstrap 4 `.collapse()` method.
  removeClassFromElement(NAVBAR_ELEMENT, NAVBAR_IS_DESKTOP);

}

function checkDropdownCollapseState(el) {
  let dropdownToggle = el.parentElement
  //console.log(el.parentElement.classList);
  if ( dropdownToggle.classList.contains('show') ) { // 'show' is a Bootstrap 4 class that makes `.collapse` items visible. // Checking to see if the Menu is open
    //console.log(el);
    collapseElement(dropdownToggle);
  }
}

function loopOverNodeList(nodeList) {
  //console.log(nodeList);
  let len = nodeList.length;

  for (var i = 0; i < len; i++) {
    const dropdownMenu = nodeList[i];

    checkDropdownCollapseState(dropdownMenu);
  }
}

function windowResizeHandler() {
  const navbarEl = windowResizeHandler.element;

  if ( window.innerWidth <= 992 && navbarEl.classList.contains(NAVBAR_IS_DESKTOP) ) {
    const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);
    const dropdownMenuNodeList = menuCollapseElement.querySelectorAll('.dropdown-toggle');

    loopOverNodeList(dropdownMenuNodeList);
    //checkNavbarCollapseState(menuCollapseElement);
  }
}

function addClassToElement(el, classString) {
  el.classList.add(classString);
}

function checkWindowWidth() {
  const windowIsWiderThanBootStrapLarge = window.innerWidth >= 992;

  windowIsWiderThanBootStrapLarge ?
    addClassToElement(NAVBAR_ELEMENT, NAVBAR_IS_DESKTOP)
  : null;
}

function toggleDropdownOnWindowResize() {

  windowResizeHandler.element = NAVBAR_ELEMENT;
  checkWindowWidth();
  window.addEventListener('resize', windowResizeHandler);
}

export default toggleDropdownOnWindowResize;
