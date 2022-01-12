import '../../scss/kcc-theme.scss';

function loadModule(...moduleArgs) {
  const module = moduleArgs[0];
  let defaultFunc;
  let funcArg = undefined;
  
  moduleArgs.length > 1 ? defaultFunc = moduleArgs[1] : defaultFunc = moduleArgs[0];
  moduleArgs.length > 2 ? funcArg = moduleArgs[2] : null;

  import(`./${module}`).then(({ default: defaultFunc }) => {
    return funcArg = undefined ? defaultFunc() : defaultFunc(funcArg);
  });
}

// Modules that load before window.onload
window.addEventListener('load', () => {
  if (document.querySelector('.hero-slider__slider')) {
    Promise.resolve()
      .then(() => loadModule('wrapPowerText'))
      .then(() => loadModule('sliders', 'initSliders'))
      .catch((err) => console.error(`Error loading slider modules :${err}`, err))
  }
  loadModule('walkText', 'walkText', document.body)
  document.querySelector('img[data-src]') ? loadModule('lazyLoad') : null;
  loadModule('footerDate')
  loadModule('addClassToOpenNavbar')
  document.getElementById('errorPageSearch') ? loadModule('errorPageSearch', 'errorPageSearch') : null;
});

// Modules that load before DOMContentLoaded happens
document.addEventListener('DOMContentLoaded', function () {
  if (window.localStorage.getItem('darkModeSetting') == 'true' || window.location.pathname == '/settings/') {
    import('./darkMode').then(({ default: darkMode }) => {
      return darkMode;
    }).then(darkMode => {
      import('../../scss/darkMode.scss').then(() => {
        return darkMode();
      });
    })
  }
  if (window.location.pathname == "/search/") {
    import('../../scss/searchPageOverrides.scss')
      .catch(err => console.error(`Error loading searchPageOverrides.scss \n${err}`, err));
  }
  document.getElementById('google_translate_element') ? loadModule('translateScript', 'watchForMenuClicks') : null;
});
