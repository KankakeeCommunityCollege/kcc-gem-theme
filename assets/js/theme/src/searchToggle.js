// Custom JS to toggle the search form on mobile devices
const SEARCH_INPUT_ID = 'gsc-i-id1';
const HEADER_GLOBAL_NAV_ID = 'headerGlobalNavbar';
const SEARCH_COLLAPSE_ID = 'searchCollapse';

function addAttribute(id, attr, val) {
  const el = document.getElementById(id);

  el.setAttribute(attr, val);
}

function searchToggle() {
  const searchButton = document.getElementById('searchIcon');
  searchButton ?
    document.addEventListener('click', function (event) {
      const searchIconElement = document.getElementById('searchImg');
      const searchCollapse = document.getElementById(SEARCH_COLLAPSE_ID);
      const headerGlobalNavbar = document.getElementById(HEADER_GLOBAL_NAV_ID);
      const searchIconBackgroundImage = searchIconElement.style.backgroundImage;
      const iconIsSearch = ( searchIconBackgroundImage.indexOf('assets/img/search.svg') != -1 );
      const collapseAria = searchCollapse.getAttribute('aria-hidden');
      const searchInputField = document.getElementById('gsc-i-id1');

      function switchToX() {
        searchIconElement.style.backgroundImage = 'url("/assets/img/x.svg")';
        searchIconElement.setAttribute('alt', 'Close icon');
        searchButton.setAttribute('aria-label', 'Close');
      }

      function switchToSearch() {
        searchIconElement.style.backgroundImage = 'url("/assets/img/search.svg")';
        searchIconElement.setAttribute('alt', 'Search icon');
        searchButton.setAttribute('aria-label', 'Search');
        searchInputField.focus();
      }

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.closest('#searchIcon')) return;
      // Don't follow the link
      event.preventDefault();
      iconIsSearch ? switchToX() : switchToSearch();
      addAttribute(SEARCH_INPUT_ID, 'tabindex', '0');
      searchCollapse.classList.toggle('header-global__search-collapse--visible');
      (collapseAria === "true") ? searchCollapse.setAttribute('aria-hidden', 'false') : searchCollapse.setAttribute('aria-hidden', 'true');
      headerGlobalNavbar.classList.toggle('header-global__navbar--search-toggle');
    }, false)
  : null;
}
export default searchToggle;
