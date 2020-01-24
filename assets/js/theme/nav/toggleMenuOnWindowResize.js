// Custom JS to Close the Navigation menu, if its open, & if the screen goes above 992px wide (Bootstrap 4 'lg' devices)
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent'; // ID built into the sites' HTML

function collapseElement(el) {
  $(el).collapse('hide'); // Bootstrap 4 `.collapse()` method.
}

function checkNavbarCollapseState(menuEl) {
  if ( menuEl.classList.contains('show') ) { // 'show' is a Bootstrap 4 class that makes `.collapse` items visible. // Checking to see if the Menu is open
    collapseElement(menuEl);
  }
}

function windowResizeHandler() {
  if ( window.innerWidth >= 992 ) {
    const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);

    checkNavbarCollapseState(menuCollapseElement);
  }
}

function toggleMenuOnWindowResize() {
  window.addEventListener('resize', windowResizeHandler);
}

export default toggleMenuOnWindowResize;
