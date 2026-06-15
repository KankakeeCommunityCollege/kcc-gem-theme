const dropdownList = document.querySelectorAll('#navGlobalBottom .dropdown');

//  Dropdown HTML markup is like this (this is somewhat simplified to actual page HTML):
//  <ul>
//    <li class="dropdown">
//      <a class="dropdown-toggle">Academics</a>
//      <div class="dropdown-menu">(Academics Menu)</div>
//    </li>
//    ...more dropdown menus
//  </ul>

function toggleDropdownOnHover(Dropdown) {  
  [...dropdownList].forEach(dropdown => { // dropdown = li.dropdown
    const toggle = dropdown.querySelector('.dropdown-toggle'); // toggle = a.dropdown-toggle
    const bsDropdown = Dropdown.getOrCreateInstance(toggle);

    // Track if the user forced the menu shut via the keyboard
    let isForcedClosed = false;

    // Show on mouse enter (only if not forced closed)
    dropdown.addEventListener('mouseenter', () => {
      if (!isForcedClosed) {
        bsDropdown.show();
      }
    });

    // Hide on mouse leave and reset the forced-closed state
    dropdown.addEventListener('mouseleave', () => {
      bsDropdown.hide();
      isForcedClosed = false; 
    });

    // Listen for Escape key while the user is interacting with the dropdown
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        bsDropdown.hide();
        isForcedClosed = true; // Prevents re-opening if mouse jitters
        
        // Optional: Return focus to the toggle button so they know where they are
        toggle.focus();
        
        // Prevent default browser behavior if necessary
        event.stopPropagation();
      }
    });

  });
}

export default toggleDropdownOnHover; 
