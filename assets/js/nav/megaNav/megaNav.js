import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import googleCustomSearchInit from './googleCustomSearch.js';

export default function megaNav(Collapse) {
  googleCustomSearchInit()
  toggleMenuOnWindowResize(Collapse);
}
