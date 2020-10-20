import footerDate from './footerDate.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import watchForMenuClicks from './translate.js';
import wrapPowerText from './wrapPowerText.js';
import addClassToOpenNavbar from './addClassToOpenNavbar.js';
//import ytEmbed from './ytEmbed.js';
//import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  wrapPowerText();
  initSliders();
  walkText(document.body);
  footerDate();
  lazyLoad();
  watchForMenuClicks();
  addClassToOpenNavbar();

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
});
