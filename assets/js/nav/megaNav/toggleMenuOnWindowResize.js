// Custom JS to Close the Navigation menu if its open and the screen width is resized
// above 992px wide (Bootstrap 5 'lg' devices)
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent'; // ID built into the sites' HTML

function checkNavbarCollapseState(menuEl, Collapse) {
  if ( menuEl.classList.contains('show') ) { // 'show' is a Bootstrap 4 class that makes `.collapse` items visible. // Checking to see if the Menu is open
    const bsCollapse = new Collapse(menuEl, {toggle: false});

    bsCollapse.hide();
  }
}

function toggleMenuOnWindowResize(Collapse) {
  window.addEventListener('resize', _e => {
    if ( window.innerWidth >= 992 ) {
      const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);

      checkNavbarCollapseState(menuCollapseElement, Collapse);
    }
  });
}

export default toggleMenuOnWindowResize;
