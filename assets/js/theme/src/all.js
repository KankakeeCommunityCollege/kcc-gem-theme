import $ from "jquery";  // Imports jquery from the node_module/
import "bootstrap";  // Imports bootstrap from the node_module/
import 'datatables.net-dt';  // Imports DataTables from the node_module/
import 'datatables.net-responsive-dt';  // Imports DataTables Responsive Plugin from the node_module/ 
import 'datatables.net-searchpanes-dt';  // Imports DataTables SearchPane Plugin from node_module/ 
import 'datatables.net-select-dt';  // Imports DataTables Select Plugin from node_module/ - required for searchPanes plugin
//import slick from "../../../vendor/slick-1.8.1/slick/slick";  // Imports slick from the /assets/vendor dir.
import footerDate from './footerDate.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import watchForMenuClicks from './translate.js';
import wrapPowerText from './wrapPowerText.js';
//import ytEmbed from './ytEmbed.js';
//import test from './test.js';
const HERO_SLIDER_CLASS = '.hero-slider__slider';

document.addEventListener('DOMContentLoaded', function() {
  if ( document.querySelector(HERO_SLIDER_CLASS) ) {
    initSliders();
  }

  wrapPowerText();
  walkText(document.body);
  footerDate();
  lazyLoad();
  watchForMenuClicks();


  $('#dataTableExample').DataTable({
    dom: 'Pfrtip',
    responsive: true, // Activate responsive powers GO!
    paging: false, // Don't paginate. Schedule schould all be on one page
    'order': []//, // Initial column ordering
  });

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
