import footerDate from './footerDate.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import googleCustomSearchInit from './googleCustomSearch.js';
import highlightNav from './highlightCurrentNav.js';
import watchForMenuClicks from './translate.js';
import closeMenuOnClick from './closeMenuOnClick.js';
import accordion from './accordion.js';
import wrapPowerText from './wrapPowerText.js';
import toggleMenuOnWindowResize from './toggleMenuOnWindowResize.js';
import megaNavInit from './megaNav.js';
//import './babelTest.js';
//import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  highlightNav();
  wrapPowerText();
  initSliders();
  walkText(document.body);
  footerDate();
  lazyLoad();
  watchForMenuClicks();
  // polyfill for Element.closest() b/c IE can't handle an anchor.match() when the anchor has another element inside it (Like spans used for BS4 menu toggler)
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
  googleCustomSearchInit();
  megaNavInit();
  accordion();
  closeMenuOnClick();
  toggleMenuOnWindowResize();
});
