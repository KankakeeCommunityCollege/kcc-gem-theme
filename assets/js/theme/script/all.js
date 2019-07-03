import footerDate from './footerDate.js';
import searchToggle from './searchToggle.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import regexText from './boldFont.js';
//import './babelTest.js';
//import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  // polyfill for Element.closest() b/c IE can't handle an anchor.match() when the anchor has another element inside it (Like spans used for BS4 menu toggler)
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                Element.prototype.webkitMatchesSelector;
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

  regexText(document.body);
  //test();
  initSliders();
  walkText(document.querySelector('.hero-slider__slider'));
  footerDate();
  searchToggle();
  lazyLoad();
});
