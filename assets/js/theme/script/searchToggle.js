// Custom JS to toggle the search form on mobile devices
function searchToggle() {
  document.getElementById('searchIcon') ?
    document.addEventListener('click', function (event) {
      const searchIconElement = document.getElementById('searchImg');
      const searchCollapse = document.getElementById('searchCollapse');
      const mainNav = document.getElementById('mainNav');
      const globalNav = document.getElementById('globalNav');
      const searchIconBackgroundImage = searchIconElement.style.backgroundImage;
      const iconIsSearch = ( searchIconBackgroundImage.indexOf('assets/img/search.svg') != -1 );
      const collapseAria = searchCollapse.getAttribute('aria-hidden');
      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches('#searchIcon')) return;
      // Don't follow the link
      event.preventDefault();
      iconIsSearch ? searchIconElement.style.backgroundImage = 'url("./assets/img/x.svg")' : searchIconElement.style.backgroundImage = 'url("./assets/img/search.svg")';
      searchCollapse.classList.toggle('nav-global__search-collapse--visible');
      (collapseAria === "true") ? searchCollapse.setAttribute('aria-hidden', 'false') : searchCollapse.setAttribute('aria-hidden', 'true');
      mainNav.classList.toggle('local-nav--search-toggle');
      globalNav.classList.toggle('nav-global--search-toggle');
    }, false)
  : null;
}
module.exports = searchToggle;
