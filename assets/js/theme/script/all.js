import footerDate from './footerDate.js';
import searchToggle from './searchToggle.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import boldFont from './boldFont.js';
//import './babelTest.js';
//import './test.js';

document.addEventListener('DOMContentLoaded', function() {
  initSliders();
  boldFont()
  walkText(document.body);
  footerDate();
  searchToggle();
  lazyLoad();
});
