// Custom JS to close an open dropdown menu if the screen is resized to less than 992px wide.
// This prevents the dropdown menu staying open when the navbar goes to the collapsed mobile state;
//  otherwise there's an open dropdown menu in a closed navbar which looks glitchy.
const GLOBAL_NAV_BOTTOM = document.getElementById('navGlobalBottom');  // ID built into the site's HTML
const NAVBAR_ELEMENT = document.getElementById('headerGlobalNavbar');  // The <nav> element built into the site's HTML
let toggleTracker;

function closeOpenDropdown(dropdownToggler, Dropdown) {
  if ( toggleTracker === true )  // Track if the navbar has already been toggled
      return; // Bail-out to prevent repetitive calls to the code below (without this the code is called many, many, many times while the screen is resizing)

  const bsDropdown = new Dropdown(dropdownToggler);

  toggleTracker = true;
  bsDropdown.hide();
}

function toggleDropdownOnWindowResize(Dropdown) {

  if ( ! NAVBAR_ELEMENT )
    return;

  window.addEventListener('resize', _e => {
    if (window.innerWidth < 992) {
      if (GLOBAL_NAV_BOTTOM.querySelector('.dropdown-toggle.show')) {
        const openDropdown = GLOBAL_NAV_BOTTOM.querySelector('.dropdown-toggle.show');

        closeOpenDropdown(openDropdown, Dropdown);
      }
    } else {
      toggleTracker = false;
    }
  });
}

export default toggleDropdownOnWindowResize;
