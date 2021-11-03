const BUTTON = document.getElementById('syncAlert');

function syncHandler(e) {
  const SVG = BUTTON.querySelector('.svg__sync');

  Promise.resolve()
    .then(() => {
      BUTTON.classList.add('buttons--sync--visible');
      SVG.classList.add('loader__sync--animate');
    }).then(() => {
      window.setTimeout(() => {
        import('./fetchNewAlert').then(({default: fetchNewAlert}) => {
          gapi.load('client', fetchNewAlert);
        });
      }, 1000);
    })
}

function showButtonOnInitialLoad(button) {
  button.classList.add('buttons--sync--visible');
  window.setTimeout(() => {
    button.classList.remove('buttons--sync--visible');
  }, 2000);
}

function refreshAlertButton() {
  window.setTimeout(() => {
    showButtonOnInitialLoad(BUTTON);
  }, 500);
  BUTTON.addEventListener('click', syncHandler);
}

export default refreshAlertButton;