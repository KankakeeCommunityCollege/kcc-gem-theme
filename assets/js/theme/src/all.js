import $ from 'jquery';  // Imports jquery from the node_module/
import 'bootstrap';  // Imports bootstrap from the node_module/
import footerDate from './footerDate.js';
import initCampusAlerts from './alerts/campusAlerts.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import initTranslate from './initTranslate.js';
import wrapPowerText from './wrapPowerText.js';
import initDataTables from  './dataTables.js';
import initNav from "./nav.js";

const HERO_SLIDER_SELECTOR = '.hero-slider__slider';
const TABLE_SELECTOR_STRING = '#Data';

document.addEventListener('DOMContentLoaded', function() {

  initCampusAlerts();
  // TODO:
  //
  // TODO: `start` from `./alerts/campusAlertsSheetsAPI.js` needs to become a dynamic import b/c:
  //     Landing pages use the kcc-theme.bundle, but don't have campusAlerts so it's throwing an
  //     Error on the exmaple landing page bucause the proper page element(s) is/are missing!
  //
  initNav();
  wrapPowerText();
  initSliders(HERO_SLIDER_SELECTOR);
  footerDate();
  lazyLoad();
  walkText(document.body);
  initTranslate();

  initDataTables(TABLE_SELECTOR_STRING);

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
