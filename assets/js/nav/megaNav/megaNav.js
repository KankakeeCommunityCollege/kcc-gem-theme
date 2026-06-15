import toggleDropdownOnHover from './toggleDropdownOnHover.js';
import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import googleCustomSearchInit from './googleCustomSearch.js';

export default function megaNav(Collapse, Dropdown) {
  toggleDropdownOnHover(Dropdown);
  googleCustomSearchInit();
  toggleMenuOnWindowResize(Collapse);
}
