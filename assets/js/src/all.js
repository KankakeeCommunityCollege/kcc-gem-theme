import '../../scss/kcc-theme.scss';

function loadModule(...moduleArgs) {
  const module = moduleArgs[0];
  let defaultFunc;
  let funcArg = undefined;
  
  moduleArgs.length > 1 ? defaultFunc = moduleArgs[1] : defaultFunc = moduleArgs[0];
  moduleArgs.length > 2 ? funcArg = moduleArgs[2] : null;

  import(`./${module}`).then(({ default: defaultFunc }) => {
    funcArg = undefined ? defaultFunc() : defaultFunc(funcArg);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  location.hostname.search(/\.kcc\.edu/) !== -1 ? loadModule('loadClarusCorpScript') : null;
  loadModule('wrapPowerText');
  loadModule('sliders', 'initSliders');
  loadModule('walkText', 'walkText', document.body);
  loadModule('footerDate');
  loadModule('lazyLoad');
  loadModule('addClassToOpenNavbar');

  if (window.localStorage.getItem('darkModeSetting') == 'true' || window.location.pathname == '/settings/') {
    import(/* webpackChunkName: 'darkMode' */ './darkMode').then(({ default: darkMode }) => {
      return darkMode;
    }).then(darkMode => {
      import(/* webpackChunkName: 'darkModeStyling' */ '../../scss/darkMode.scss').then(() => {
        darkMode();
      });
    })
  }
  if (window.location.pathname == "/search/") {
    import(/* webpackChunkName: 'searchPageOverrides' */ '../../scss/searchPageOverrides.scss').then(() => {
      console.info('Search page overrides styling loaded');
    }).catch( err => console.error(`Error loading searchPageOverrides.scss \n${err}`, err) );
  }
  document.getElementById('google_translate_element') ? loadModule('translateScript', 'watchForMenuClicks') : null;
  document.getElementById('errorPageSearch') ? loadModule('errorPageSearch', 'errorPageSearch') : null;
});
