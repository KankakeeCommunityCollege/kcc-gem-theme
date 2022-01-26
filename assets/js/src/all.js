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

//  1.) Import hero slider JS modules
// './wrapPowerText'
// 'sliders', 'initSliders'
// Hero slider module import error handler

// 2.) 'walkText', 'walkText', document.body
// 3.) 'lazyLoad'
// 4.) 'footerDate'
// 5.) 'addClassToOpenNavbar'
// 6.) 'errorPageSearch'
  
// 7. 'darkMode' JS modules
// 8.) 'darkMode.scss'
  
// 9. '../../scss/searchPageOverrides.scss'
// 10.) document.getElementById('google_translate_element') ? loadModule('translateScript', 'watchForMenuClicks') : null;
  
  import('../alerts/alerts')
    .then(({ default: alerts }) => alerts())
    .then(() => {
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
    })
    .then(async () => {
      const { default: megaNav } = await import('../nav/megaNav/megaNav');
      return megaNav();
    })
    .catch(err => console.error(`Error loading window.onload modules: ${err}`, err))
  
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
    if (document.getElementById('google_translate_element')) {
      import('./translateScript').then(({ default: watchForMenuClicks }) => {
        return watchForMenuClicks();
      })
    }
});

