import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
//import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResize.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

document.addEventListener('DOMContentLoaded', function() {
  toggleMenuOnWindowResize();
  //toggleDropdownOnWindowResize();
  googleCustomSearchInit();
  closeMenuOnClick();
});
