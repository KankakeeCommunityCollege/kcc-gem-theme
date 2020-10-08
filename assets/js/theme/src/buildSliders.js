// Custom JS to initialize slick slider (https://github.com/kenwheeler/slick) and then build a play/pause toggle button
// Uses slick-specific methods & slick events. See slick events at: https://github.com/kenwheeler/slick/#events
const SLICK_PLAY = 'slickPlay';  // Methods unique to slick
const SLICK_PAUSE = 'slickPause';  // Methods unique to slick
const SLICK_NEXT_SLIDE = 'slickNext';  // Methods unique to slick
const play = 'Play';
const pause = 'Pause';
const SLICK_PARAMETERS_OBJECT = {  // Slick takes paramaters as an object. SEE: https://kenwheeler.github.io/slick/#settings
  dots: true,  // indicator dots for each slide, along the bottom
  slidesToShow: 1, // # of slides visible at a time
  slidesToScroll: 1, // How any slides scroll when scrolled/swipped/clicked-next/prev
  autoplay: true, // Should it start rotating as soon as it's ready? true = yes
  autoplaySpeed: 4000, // Speed in milliseconds that each slide is displayed
  prevArrow: '<button type="button" data-role="none" class="prev slick-prev" aria-label="Previous" role="button" style="display: block;">Previous</button>', // HTML as a string which becomes a custom previous arrow
  nextArrow: '<button type="button" data-role="none" class="next slick-next" aria-label="Next" role="button" style="display: block;">Next</button>' // HTML as a string which becomes a custom next arrow
}

function setAttributeOnEl(el, attr, value) {
  return el.setAttribute(attr, value);
}

function toggleSlickPlayState(el, slickState, newButtonText, slickSelector) {
  const newButtonTextIsPause = newButtonText === pause;

  slickSelector.slick(slickState);
  setAttributeOnEl(el, 'aria-label', newButtonText);
  el.classList.toggle('hero-slider__button--play');
  el.innerHTML = newButtonText;

  newButtonTextIsPause ? slickSelector.slick(SLICK_NEXT_SLIDE) : null;
}

function watchForElementClicks(el, slickSelector) {
  el.addEventListener('click', function(e) {
    let buttonTextIsPause = el.innerHTML === 'Pause';

    buttonTextIsPause ? toggleSlickPlayState(el, SLICK_PAUSE, play, slickSelector) : toggleSlickPlayState(el, SLICK_PLAY, pause, slickSelector);
  });
}

function createButton(slickSelector) {
  const button = document.createElement('button');
  const initialButtonText = 'Pause';

  setAttributeOnEl(button, 'role', 'button');
  button.type = 'button';
  button.ariaLabel = 'Pause';
  button.style = 'display: block;';
  button.innerHTML = initialButtonText;
  button.classList.add('hero-slider__button--toggle');
  slickSelector[0].appendChild(button); // Un-jquery the jquery selection
  watchForElementClicks(button, slickSelector);
}

function initSlick(el, slickParamsObject) {
  el.slick(slickParamsObject);  // To inialize slick, take a jquery selection and call .slick() on it, passing our settings-object as an argument.
}

function buildSliders(selector) {
  if (document.querySelector(selector)) {
    import(/* webpackChunkName: "slick" */ '../../../vendor/slick-1.8.1/slick/slick').then(module => {  // Those are Webpack's "Magic Comments" which create a new chunk named slick.bundle.js that is conditionaly/dynamically imported here.
      const slick = module.default; // Webpack says: You must reference the imported module's .default property (https://webpack.js.org/guides/lazy-loading/)
      const slickSelector = $(selector);

      slickSelector.on('init', function (event) { // According to slick doc's; you have to call a $(slick).on('init', function(){ //... }); before you initialize slick
        createButton(slickSelector);
      });
      initSlick(slickSelector, SLICK_PARAMETERS_OBJECT);  // Safe to initialize slick after the .on('init' , ...
    });
  } else {
    return;
  }
}
//
//  USAGE:
//
//    import buildSliders from './buildSliders.js';
//
//    document.addEventListener('DOMContentLoaded', function() {
//      buildSliders(<querySelector string that matches the slick element>);
//    });
//
//  EXAMPLE:
//
//  // FILE: `/assets/js/theme/src/all.js` (entry-point for webpack)
//
//    import buildSliders from './buildSliders.js';
//
//    const HERO_SLIDER_SELECTOR = '.hero-slider__slider';
//
//    document.addEventListener('DOMContentLoaded', function() {
//      buildSliders(HERO_SLIDER_SELECTOR);
//    });
//
export default buildSliders;
