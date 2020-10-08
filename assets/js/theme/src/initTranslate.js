const GOOGLE_TRANSLATE_ID = 'google_translate_element';

function initTranslate() {
  if (document.getElementById(GOOGLE_TRANSLATE_ID)) {
    import(/* webpackChunkName: "watchForTranslateClicks" */ './translate').then(({ default: watchForTranslateClicks }) => {
      watchForTranslateClicks();
    });
  }
}

export default initTranslate;
