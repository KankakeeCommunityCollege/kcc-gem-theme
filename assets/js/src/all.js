import '../../scss/kcc-theme.scss';
// import { Collapse, Tab, Dropdown } from 'bootstrap';
import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';

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
    .then(({ default: alerts }) => alerts(Collapse))
    .then(() => {
      if (document.querySelector('.hero-slider__slider')) {
        Promise.resolve()
          .then(() => import('./wrapPowerText').then(({default: wrapPowerText}) => wrapPowerText()))
          .then(() => import('./sliders').then(({ default: initSliders }) => initSliders()))
          .catch((err) => console.error(`Error loading slider modules :${err}`, err))
      }
      import('./walkText').then(({ default: walkText }) => walkText(document.body));
      if (document.querySelector('img[data-src]')) {
        import('./lazyLoad').then(({ default: lazyLoad }) => lazyLoad());
      }
      import('./footerDate').then(({ default: footerDate }) => footerDate());
      import('./addClassToOpenNavbar').then(({ default: addClassToOpenNavbar }) => addClassToOpenNavbar());
    })
    .then(async () => {
      if (document.getElementById('headerGlobalNavbarContent')) {
        const { default: megaNav } = await import('../nav/megaNav/megaNav');

        return megaNav(Collapse, Dropdown);
      }
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
    if (document.getElementById('SearchTermForm')) {
      return import('./watchForWebsiteSearch').then(({ default: init }) => init()); 
    }
  if (
    document.querySelector('.modal') &&
    window.location.pathname.indexOf('/support-resources/') === -1
  ) {
    // Conditionally import BS5 Modal plugin in pages with a modal, but
    // do NOT on the support-resources page. This page already uses the
    // modal plugin and we don't want duplicate imports.
    import('bootstrap/js/dist/modal').then(({ default: Modal }) => Modal);
    }
});

