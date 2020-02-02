// Custom JS to Close the Navigation menu, if its open, & if the screen goes above 992px wide (Bootstrap 4 'lg' devices)
const NAVBAR_COLLAPSE_ID = 'headerGlobalNavbarContent'; // ID built into the sites' HTML

function collapseElement(el) {
  console.log( $(el) );
  $(el).collapse('hide'); // Bootstrap 4 `.collapse()` method.
}

function checkDropdownCollapseState(el) {
  if ( el.classList.contains('show') ) { // 'show' is a Bootstrap 4 class that makes `.collapse` items visible. // Checking to see if the Menu is open
    collapseElement(el);
  }
}

function loopOverNodeList(nodeList) {
  let len = nodeList.length;

  for (var i = 0; i < len; i++) {
    const dropdownMenu = nodeList[i];

    checkDropdownCollapseState(dropdownMenu);
  }
}

function returnInitialWidth() {
  const width = window.innerWidth;
  return width;
}

function windowResizeHandler() {
  console.log(returnInitialWidth());
  const mediaQueryString = '(max-width: 992px)';
  const mediaQueryList = window.matchMedia(mediaQueryString);

  if ( mediaQueryList.matches === true ) {
    console.log('Media query matches is true');
  }

  if ( window.innerWidth >= 992 ) {
    const menuCollapseElement = document.getElementById(NAVBAR_COLLAPSE_ID);
    const dropdownMenuNodeList = menuCollapseElement.querySelectorAll('.dropdown-toggle');

    loopOverNodeList(dropdownMenuNodeList);
    //checkNavbarCollapseState(menuCollapseElement);
  }
}

function toggleDropdownOnWindowResize() {
  window.addEventListener('resize', windowResizeHandler);
}

export default toggleDropdownOnWindowResize;
