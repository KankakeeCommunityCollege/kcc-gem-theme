const NAV_LINKS_SELECTOR = '.nav-link:not(.dropdown-toggle)';  // Bootstrap 4 class
const MENU_COLLAPSE_JQUERY = $('#headerGlobalNavbarContent'); // Bootstrap 4 crap that requires $() w/ an ID from the HTML
const MENU_COLLAPSE = 'headerGlobalNavbarContent';  // ID from the HTML
const HIDE = 'hide';  // Bootstrap 4 class
const SHOW = 'show';  // Bootstrap 4 class

function clickHandlerFunction(e) {
  if ( !e.target.matches(NAV_LINKS_SELECTOR) || e.target.classList.contains('dropdown-toggle') )  // Bail out of the rest of the code if the click event's target is not what we want!
    return;

  const menuIsOpen = document.getElementById(MENU_COLLAPSE).classList.contains(SHOW) ? true : false;

  if (menuIsOpen) {
    MENU_COLLAPSE_JQUERY.collapse(HIDE);
  }
}

function closeMenuOnClick() {
  document.addEventListener('click', clickHandlerFunction);
}

export default closeMenuOnClick;
