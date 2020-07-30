import highlightNav from './highlightCurrentNav.js';
import closeMenuOnClick from './closeNavOnClick.js';
import moveSearchIcon from './moveSearchIcon.js';
import searchToggle from './searchToggleNav.js';
import toggleSearchDropdownOnWindowResize from './toggleNavSearchDropdownOnWindowResize.js';

function initOldNav() {
  highlightNav();
  searchToggle();
  moveSearchIcon();
  closeMenuOnClick();
  toggleSearchDropdownOnWindowResize();
}

export default initOldNav;
