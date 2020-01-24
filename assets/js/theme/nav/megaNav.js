import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

document.addEventListener('DOMContentLoaded', function() {
  toggleMenuOnWindowResize();
  googleCustomSearchInit();
  closeMenuOnClick();
});
