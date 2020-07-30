function initNav() {
  if ( document.getElementById('headerGlobalNavbar') ) {
    import(/* webpackChunkName: 'initMegaNav' */ './nav/megaNav/megaNav.js').then(({ default: initMegaNav })=> {
      initMegaNav();
    });
  } else if (document.getElementById('navGlobal') ) {
    import(/* webpackChunkName: 'initOldNav' */ './nav/nav/oldNav.js').then(({ default: initOldNav }) => {
      initOldNav();
    });
  }
} 

export default initNav;