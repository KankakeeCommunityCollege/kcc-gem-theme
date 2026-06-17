// =============================================================================== //
// This module provides the mega-menu open on hover functionality.                 //
// This functionality must hook into the BS5 components to ensure proper toggling  //
//  of aria/accessibility attributes.                                              //
// Simple CSS hover effects will provide the functionality but are not accessible. //
// We also need to allow users to close a dropdown via the escape key even when    //
//  toggle by mouse hover (see note above `let isForcedClosed = false`).           //
// =============================================================================== //
const dropdownList = document.querySelectorAll('#navGlobalBottom .dropdown');

//  BS5 dropdown HTML markup is like this (this is simplified to show HTML structure):
//  <ul>
//    <li class="dropdown">
//      <a class="dropdown-toggle">Academics</a>
//      <div class="dropdown-menu">(Academics Menu)</div>
//    </li>
//    ...more dropdown menus
//  </ul>

function toggleDropdownOnHover(Dropdown) {
  // Loop over the .dropdown list items
  [...dropdownList].forEach(dropdown => { 
    const toggle = dropdown.querySelector('.dropdown-toggle'); // Grab out dropdown-toggles (anchor elements)
    const bsDropdown = Dropdown.getOrCreateInstance(toggle); // Initiate BS5 Dropdown so we can use the .show(), .hide(), etc. methods.

    let isLockedOpen = false; // Track if the user clicked the dropdown to keep it open
    // Track if the user hit the escape key to bail out of the menu when hovering.
    // This is a WCAG 2.1 criteria so that users of screen magnifiers can easily close a menu if they
    // accidentally hover and the menu then obscures their screen since they're zoomed in so much.
    let isForcedClosed = false;

    // 1. Hover Enter
    dropdown.addEventListener('mouseenter', () => {
      // Prevent re-toggling the dropdown if:
      // * they hit escape (b/c the mouse is most likely still within the dropdown toggle element), or
      // * they locked the dropdown open by clicking it.
      if (!isLockedOpen && !isForcedClosed) {
        bsDropdown.show();
      }
    });

    // 2. Hover Leave
    dropdown.addEventListener('mouseleave', () => {
      // Don't close it on them if they clicked the dropdown menu to keep it open
      if (!isLockedOpen) {
        bsDropdown.hide();
      }
      isForcedClosed = false; // Reset escape key block
    });

    // 3. Handle the Click Lock (Respecting the native Bootstrap toggle)
    toggle.addEventListener('click', (event) => {
      // If it was opened by hover and NOT yet locked, the native click 
      // will cause it to close. We intercept this to lock it open instead.
      if (!isLockedOpen) {
        isLockedOpen = true;
        
        // If Bootstrap already processed the click and closed it, force it back open
        setTimeout(() => {
          bsDropdown.show();
        }, 0);
        
        // Prevent default link navigation if the toggle is an <a> tag
        event.preventDefault();
      } else {
        // If it was already locked open, this second click unlocks and closes it
        isLockedOpen = false;
      }
    });

    // 4. Reset lock if closed externally (clicking outside, tabbing away, etc.)
    toggle.addEventListener('hidden.bs.dropdown', () => {
      // Only reset lock if the mouse isn't currently hovering over it
      // (This prevents the click-to-close transition from permanently breaking the state)
      if (!dropdown.matches(':hover')) {
        isLockedOpen = false;
      }
    });

    // 5. Escape Key Handling
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        isLockedOpen = false;
        isForcedClosed = true; // Prevent re-opening if the mouse is still hovering the dropdown toggle
        bsDropdown.hide();
        toggle.focus(); // Return focus to the toggle button so they know where they are.
        event.stopPropagation(); // Prevent default browser behavior if necessary
      }
    });

  });
}

export default toggleDropdownOnHover;
