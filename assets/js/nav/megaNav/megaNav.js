import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import toggleDropdownOnWindowResize from './toggleDropdownOnWindowResizeTwo.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import closeMenuOnClick from './closeMegaNavOnClick.js';

export default function megaNav() {
  googleCustomSearchInit();
  if (window.location.pathname == '/') {
    import('./underlineCurrentSite').then(({default: underlineCurrentSite}) => underlineCurrentSite())
  }
  toggleMenuOnWindowResize();
  toggleDropdownOnWindowResize();
  closeMenuOnClick();
}
