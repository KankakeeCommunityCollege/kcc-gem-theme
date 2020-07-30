// Custom JS to toggle the search form on mobile devices
function searchToggle() {
  const searchButton = document.getElementById('searchIcon');
  searchButton ?
    document.addEventListener('click', function (event) {
      const searchIconElement = document.getElementById('searchImg');
      const searchCollapse = document.getElementById('searchCollapse');
      const mainNav = document.getElementById('mainNav');
      const globalNav = document.getElementById('globalNav');
      const searchIconBackgroundImage = searchIconElement.style.backgroundImage;
      const iconIsSearch = ( searchIconBackgroundImage.indexOf('assets/img/search.svg') != -1 );
      const collapseAria = searchCollapse.getAttribute('aria-hidden');
      const searchInputField = document.getElementById('gsc-i-id1');

      function switchToX() {
        searchIconElement.style.backgroundImage = 'url("/assets/img/x.svg")';
        searchIconElement.setAttribute('alt', 'Close icon');
        searchButton.setAttribute('aria-label', 'Toggle Close');
      }

      function switchToSearch() {
        searchIconElement.style.backgroundImage = 'url("/assets/img/search.svg")';
        searchIconElement.setAttribute('alt', 'Search icon');
        searchButton.setAttribute('aria-label', 'Toggle Search');
        searchInputField.focus();
      }

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.closest('#searchIcon')) return;
      // Don't follow the link
      event.preventDefault();
      iconIsSearch ? switchToX() : switchToSearch();
      searchCollapse.classList.toggle('nav-global__search-collapse--visible');
      (collapseAria === "true") ? searchCollapse.setAttribute('aria-hidden', 'false') : searchCollapse.setAttribute('aria-hidden', 'true');
      mainNav.classList.toggle('nav-local__search-toggle');
      globalNav.classList.toggle('nav-global__search-toggle');
    }, false)
  : null;
}
export default searchToggle;
