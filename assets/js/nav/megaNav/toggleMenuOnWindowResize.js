// Custom JS to toggle the navigation menu if a dropdown item is open
// and the screen is resized to mobile sized nav. Otherwise, the dropdown
// will stay open while the menu is collapsed causing it to look broken.
const globalNavBottom = document.getElementById('navGlobalBottom');  // built into the site's HTML
const menuCollapseElement = document.getElementById('headerGlobalNavbarContent');

function hideOpenMenu(menuEl, bsCollapse) {
  if ( menuEl.classList.contains('show') ) { // 'show' is a Bootstrap 4 class that makes `.collapse` items visible. // Checking to see if the Menu is open
    bsCollapse.hide(); // BS5 Collapse.hide() method
  }
}

function openMenu(bsCollapse) {
  bsCollapse.show(); // BS5 Collapse.show() method
}

/**
 * 
 * @param {function} Collapse Bootstrap 5 Collapse plugin
 * @see https://getbootstrap.com/docs/5.3/components/collapse/#via-javascript
 */
function toggleMenuOnWindowResize(Collapse) {
  const bsCollapse = new Collapse(menuCollapseElement, { toggle: false });

  window.addEventListener('resize', _e => {
    // 992px and up is bootstrap breakpoint for "lg"
    if ( window.innerWidth >= 992 ) {
      hideOpenMenu(menuCollapseElement, bsCollapse);
    } else {
      if (globalNavBottom.querySelector('.dropdown-toggle.show')) {
        openMenu(bsCollapse);
      }
    }
  });
}

export default toggleMenuOnWindowResize;
