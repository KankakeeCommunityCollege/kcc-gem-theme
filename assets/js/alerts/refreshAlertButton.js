// Custom JS to give functionality to the "Refresh the alert" button
// Button HTML is build into DOM by ./alert.js
// Styling is located in /assets/scss/{ _buttons, _loader, _svg}.scss
const BUTTON = document.getElementById('syncAlert');

function syncHandler(e) {
  const SVG = BUTTON.querySelector('.svg__sync');

  Promise.resolve()
    .then(() => {
      BUTTON.classList.add('buttons--sync--visible');
      SVG.classList.add('loader__sync--animate');
    }).then(() => {
      // Add a short delay before fetching the new alert
      window.setTimeout(() => { // (alert fetches too fast for the loading animation without this delay)
        import('./fetchNewAlert').then(({default: fetchNewAlert}) => {
          gapi.load('client', fetchNewAlert); // Runs a new call to gapi and repaints the alert HTML
        });
      }, 1000);
    })
}

function showButtonOnInitialLoad(button) {
  button.classList.add('buttons--sync--preview'); // This class has an animation that shows the button for 3-sec.
  window.setTimeout(() => {
    button.classList.remove('buttons--sync--preview'); // Remove the class after enough time for animations has elapsed
  }, 3000);
}

function refreshAlertButton() {
  window.setTimeout(() => { // Short delay before showing the refresh button
    showButtonOnInitialLoad(BUTTON);
  }, 500);
  BUTTON.addEventListener('click', syncHandler);
}

export default refreshAlertButton;
