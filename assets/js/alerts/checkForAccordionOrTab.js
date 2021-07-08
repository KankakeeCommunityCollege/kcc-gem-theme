// A simple module to check if the `contentHashLink` module needs to be imported.
export default function checkForAccordionOrTab() {
  if (
    document.querySelector('#accordion') ||
    document.querySelector('.nav.nav-tabs')
  ) {
    import(/* webpackChunkName: 'contentHashLink' */ './contentHashLink').then(({default: contentHashLink}) => {
      contentHashLink();
    });
   }
};