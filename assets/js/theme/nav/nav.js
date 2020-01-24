import highlightNav from './highlightCurrentNav.js';
import closeMenuOnClick from './closeNavOnClick.js';
import moveSearchIcon from './moveSearchIcon.js';
import searchToggle from './searchToggleNav.js';
import toggleSearchDropdownOnWindowResize from './toggleSearchDropdownOnWindowResize.js';

document.addEventListener('DOMContentLoaded', function() {
  highlightNav();
  searchToggle();
  moveSearchIcon();
  closeMenuOnClick();
  toggleSearchDropdownOnWindowResize();
});
