function initSliders(selector) {

  if (document.querySelector(selector)) {
    import(/* webpackChunkName: "buildSliders" */ './buildSliders').then(({default: buildSliders}) => {
      buildSliders(selector);
    });
  }
}

export default initSliders;
