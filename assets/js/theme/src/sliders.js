function initSliders() {
  function initSlick() {
    $('.hero-slider__slider').slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow:'<img alt="Previous slide" class="a-left control-c prev slick-prev" src="/assets/img/dbl-prev.svg">',
      nextArrow:'<img alt="Next slide" class="a-right control-c next slick-next" src="/assets/img/dbl-next.svg">'
    });
  }
  document.querySelector('.hero-slider__slider') ? initSlick() : null;
}
export default initSliders;
