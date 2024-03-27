import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResizeTwo.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

export default function megaNav(Collapse) {
  googleCustomSearchInit();
  toggleMenuOnWindowResize(Collapse);
  toggleDropdownOnWindowResize(Collapse);
  closeMenuOnClick();
}
