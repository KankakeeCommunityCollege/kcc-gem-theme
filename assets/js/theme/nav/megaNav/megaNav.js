import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResizeTwo.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';
import underlineCurrentSite from './underlineCurrentSite.js';

document.addEventListener('DOMContentLoaded', function() {
  googleCustomSearchInit();
  underlineCurrentSite();
  toggleMenuOnWindowResize();
  toggleDropdownOnWindowResize();
  closeMenuOnClick();
});
