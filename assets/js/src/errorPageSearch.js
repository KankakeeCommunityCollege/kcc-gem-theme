// Custom JS to toggle the search field at the top of the 404 page when
// User clicks the search button.
const BUTTON_ID = 'errorPageSearch';
const SEARCH_ID = 'openSearchButton';

function errorPageSearch() {
  const button = document.getElementById(BUTTON_ID);
  const searchToggle = document.getElementById(SEARCH_ID);
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    searchToggle.click();
  });
}

export default errorPageSearch;