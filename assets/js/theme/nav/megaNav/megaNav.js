import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResizeTwo.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

document.addEventListener('DOMContentLoaded', function() {
  toggleMenuOnWindowResize();
  toggleDropdownOnWindowResize();
  googleCustomSearchInit();
  closeMenuOnClick();
});
