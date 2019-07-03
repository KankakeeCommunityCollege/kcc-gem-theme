import footerDate from './footerDate.js';
import searchToggle from './searchToggle.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
import initSliders from './sliders.js';
import regexText from './boldFont.js';
//import './babelTest.js';
//import test from './test.js';

document.addEventListener('DOMContentLoaded', function() {
  regexText(document.body);
  //test();
  initSliders();
  walkText(document.querySelector('.hero-slider__slider'));
  footerDate();
  searchToggle();
  lazyLoad();
});
