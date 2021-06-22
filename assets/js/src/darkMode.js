const htmlElement = document.querySelector('html');
const DARK_MODE_BUTTON_ID = 'darkModeButton';

function darkModeClickHandler(e) {
  return htmlElement.classList.toggle('dark-mode');
}

function darkMode() {
  console.info('Dark Mode (is the best)!');
  window.localStorage.getItem('darkModeSetting') === 'true' ? htmlElement.classList.add('dark-mode') : null;
  if (window.location.pathname !== '/settings/') return;
  const darkModeButton = document.getElementById(DARK_MODE_BUTTON_ID);

  darkModeButton.addEventListener('click', darkModeClickHandler);
}

export default darkMode;