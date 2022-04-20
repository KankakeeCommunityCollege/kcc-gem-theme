const FORM = document.getElementById('SearchTermForm');
const SEARCH_URL_PATH = 'https://www.kcc.edu/search';

function submissionHandler(e) {
  const target = e.target;
  const SEARCH_STRING = encodeURIComponent(target.querySelector('#searchTermInput').value);
  const SEARCH_QUERY = `?q=${SEARCH_STRING}`

  e.preventDefault();
  return window.location = new URL(SEARCH_URL_PATH + SEARCH_QUERY);
}

function watchForWebsiteSearch() {
  FORM.addEventListener('submit', submissionHandler);
}

export default watchForWebsiteSearch;