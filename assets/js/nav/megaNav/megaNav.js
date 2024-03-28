import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResize.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

export default function megaNav(Collapse, Dropdown) {
  googleCustomSearchInit();
  toggleMenuOnWindowResize(Collapse);
  toggleDropdownOnWindowResize(Dropdown);
  closeMenuOnClick(Collapse);
}
