import footerDate from './footerDate.js';
import searchToggle from './searchToggle.js';
import lazyLoad from './lazyLoad.js';
import walkText from './walkText.js';
//import './babelTest.js';
//import './test.js';

document.addEventListener('DOMContentLoaded', function() {
  walkText(document.body);
  footerDate();
  searchToggle();
  lazyLoad();
});
