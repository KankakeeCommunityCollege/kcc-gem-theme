function initSlick() {
  $('.hero-slider__slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow:'<img alt="Previous" class="a-left control-c prev slick-prev" src="/assets/img/dbl-prev.svg">',
    nextArrow:'<img alt="Next" class="a-right control-c next slick-next" src="/assets/img/dbl-next.svg">'
  });
}

function setAttributeOnEl(el, attr, value) {
  return el.setAttribute(attr, value);
}

function createButton() {
  const SLICK_PARENT_EL = document.querySelector('.hero-slider__slider');
  const button = document.createElement('button');
  const buttonText = 'Pause';

  setAttributeOnEl(button, 'role', 'button');
  setAttributeOnEl(button, 'type', 'button');
  setAttributeOnEl(button, 'aria-label', 'Pause');
  button.innerHTML = buttonText;
  SLICK_PARENT_EL.appendChild(button);
}

function watchForSlickInit(initFunction) {
  $('.hero-slider__slider').on('init', function(event, slick){
    console.log(slick);
    createButton();
  });
  initFunction();
}

function initSliders() {
  if ( ! document.querySelector('.hero-slider__slider') )
    return;

  watchForSlickInit(initSlick);
}
export default initSliders;
