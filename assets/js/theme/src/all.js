import $ from "jquery";
import "bootstrap";
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-searchpanes-dt';
import 'datatables.net-select-dt';
import slick from "../../../vendor/slick-1.8.1/slick/slick";
import footerDate from './footerDate.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import watchForMenuClicks from './translate.js';
import wrapPowerText from './wrapPowerText.js';
//import ytEmbed from './ytEmbed.js';
//import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  wrapPowerText();
  initSliders();
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
