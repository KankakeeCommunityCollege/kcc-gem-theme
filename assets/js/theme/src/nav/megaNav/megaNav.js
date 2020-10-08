import $ from 'jquery';
import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResizeTwo.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';
import underlineCurrentSite from './underlineCurrentSite.js';

function initMegaNav() {
  googleCustomSearchInit();
  underlineCurrentSite();
  toggleMenuOnWindowResize();
  toggleDropdownOnWindowResize();
  closeMenuOnClick();
}

export default initMegaNav;
