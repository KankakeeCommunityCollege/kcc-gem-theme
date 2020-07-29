// Custom JS to initialize slick slider (https://github.com/kenwheeler/slick) and then build a play/pause toggle button
// Uses slick-specific methods & slick events. See slick events at: https://github.com/kenwheeler/slick/#events
const SLICK_PLAY = 'slickPlay';  // Methods unique to slick
const SLICK_PAUSE = 'slickPause';  // Methods unique to slick
const SLICK_NEXT_SLIDE = 'slickNext';  // Methods unique to slick
const play = 'Play';
const pause = 'Pause';
const SLICK_PARAMETERS_OBJECT = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  prevArrow: '<button type="button" data-role="none" class="prev slick-prev" aria-label="Previous" role="button" style="display: block;">Previous</button>',
  nextArrow: '<button type="button" data-role="none" class="next slick-next" aria-label="Next" role="button" style="display: block;">Next</button>'
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
  setAttributeOnEl(button, 'type', 'button');
  setAttributeOnEl(button, 'aria-label', 'Pause');
  button.style = 'display: block;';
  button.innerHTML = initialButtonText;
  button.classList.add('hero-slider__button--toggle');
  slickSelector[0].appendChild(button); // Un-jquery the jquery selection
  watchForElementClicks(button, slickSelector);
}

function initSlick(el, slickParamsObject) {
  el.slick(slickParamsObject);
}

function initSliders(selector) {
  if (document.querySelector(selector)) {
    import(/* webpackChunkName: "slick" */ '../../../vendor/slick-1.8.1/slick/slick').then(module => {
      const slick = module.default;
      const slickSelector = $(selector);

      slickSelector.on('init', function (event) { // According to slick doc's; you have to call a $(slick).on('init', function(){ //... }); before you initialize slick
        createButton(slickSelector);
      });
      initSlick(slickSelector, SLICK_PARAMETERS_OBJECT);
    });
  }
}
//
//  USAGE:
//
//    import initSliders from './sliders.js';
//
//    document.addEventListener('DOMContentLoaded', function() {
//      initSliders(<querySelector string that matches the slick element>);
//    });
export default initSliders;
