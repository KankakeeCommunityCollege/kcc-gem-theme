const htmlElement = document.querySelector('html');

function darkModeClickHandler(e) {
  return htmlElement.classList.toggle('dark-mode');
}

function darkMode() {
  console.info('Dark Mode (is the best)!');
  window.localStorage.getItem('darkModeSetting') === 'true' ? htmlElement.classList.add('dark-mode') : null;

  const darkModeButton = document.getElementById('darkModeButton');

  // Optional chain (?.) prevents errors when button is missing.
  darkModeButton?.addEventListener('click', darkModeClickHandler);
}

export default darkMode;
