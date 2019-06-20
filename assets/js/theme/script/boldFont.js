// Replace all occurences of "--" (double hyphens) with "—" (long-em dash)
function boldFont() {
  function replaceFont() {
    var headingArray = document.querySelectorAll('h3.hero-slider__slider--slide-heading');
    headingArray.forEach(function(element) {
      element.innerHTML = element.innerHTML.replace(/\*\*POWER\*\*/g, '<span class="typography__power-text">POWER</span>');
    });
  }

  document.querySelectorAll('h3.hero-slider__slider--slide-heading') ? replaceFont()
  : null;
}
module.exports = boldFont;
