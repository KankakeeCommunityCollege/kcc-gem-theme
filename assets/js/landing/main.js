// import '../../scss/main.scss';

window.addEventListener('load', async () => {
  if (document.querySelector('a[href="#page-top"]')) {
    const { default: landingPage } = await import('./landingPage');

    landingPage();
  }
});
