const NAV_LINKS_SELECTOR = '.nav-link:not(.dropdown-toggle)';  // Bootstrap 4 class
const MENU_COLLAPSE = 'headerGlobalNavbarContent';  // ID from the HTML


function closeMenuOnClick(Collapse) {
  document.addEventListener('click', e => {
    if ( !e.target.matches(NAV_LINKS_SELECTOR) || e.target.classList.contains('dropdown-toggle') )  // Bail out of the rest of the code if the click event's target is not what we want!
      return;

    const menuCollapse = document.getElementById(MENU_COLLAPSE);

    if (menuCollapse.classList.contains('show')) {
      const bsCollapse = new Collapse(menuCollapse, {toggle: false});

      bsCollapse.hide();
    }
  });
}

export default closeMenuOnClick;
