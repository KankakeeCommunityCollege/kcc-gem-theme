// Custom JS to do cool stuff with BS accordions and tabs by manipulating URL hashes and query's
// EXAMPLE:
//  https://<ORIGIN>/?id=course-withdrawals#tuition-payment-and-deadlines
//    The above URL will:
//      1. Open the #tuition-payment-and-deadlines accordion if it exists
//      2. The ?id=course-withdrawals query will:
//         - look inside the opened accordion for an element with the id 'course-withdrawals', and
//         - scroll that matching element into the user's viewport (in this case it's a heading within that accordion card)
//
//  This JS will allow us to link to a specific area of content in a page where a traditional hash link wouldn't work
//  In this case hash links won't work because the element with he matching ID is "stuck" in a closed accordion or tab.
//
const idRegex = /^id=/g; // Lets just cache these reused regex's here
const queryStartRegex = /^\?/g;
const endingSlashRegex = /\/$/g;
const PREFERS_REDUCED_MOTION_LOCALSTORAGE_KEY = 'userPrefersReducedMotion'; // This localStorage key is set by module: './checkForPrefersReducedMotion.js'
const scrollIntoViewOptionsObject = {
  behavior: 'smooth',
  block: 'center'
}
const reducedMotionscrollIntoViewOptionsObject = {
  block: 'center'
}

function focusElement(el) {
  const prefersReducedMotion = window.localStorage.getItem(PREFERS_REDUCED_MOTION_LOCALSTORAGE_KEY);

  prefersReducedMotion == 'true' ? el.scrollIntoView(reducedMotionscrollIntoViewOptionsObject) : el.scrollIntoView(scrollIntoViewOptionsObject);
  return el.focus();
}

function processIdQuery(query, hash) {
  let id = query.replace(idRegex, '');
  const parentEl = document.querySelector(hash);
  const heading = parentEl.querySelector(`#${id}`);

  focusElement(heading);
}

function checkForQuery(query, hash) {
  query.search(idRegex) !== -1 ?
    processIdQuery(query, hash)
  : null;
}

function findContentTarget(hash) {
  const target = document.querySelector(hash);

  focusElement(target);
}

function checkForMatchingTabOrAccordion(hash) {
  if ( document.querySelector(`.nav-tabs a[href="${hash}"]`) ) {  // Looks for a matching BS4 tab element
    let tab = $(`.nav-tabs a[href="${hash}"]`);  // **SIGH**, BS4 requires JQuery

    tab
      .on('shown.bs.tab', () => {  // Bootstrap 4 method for tab events // Must be defined before the tab is activated
        window.location.search ?
          checkForQuery(window.location.search.replace(queryStartRegex, ''), hash)
          : null; })
      .tab('show');  // Bootstrap 4 Tab method
    findContentTarget(`${hash}-label`); // You need to .scrollIntoView() & .focus() on the tab-label which is an <a href="...">. It won't work to do .scrollIntoView() and .focus() on the div
  } else if ( document.querySelector(`${hash}.collapse`) ) {  // Looks for a matching BS4 collapse element
    let card = $(hash);  // **SIGH**, BS4 requires JQuery

    card
      .on('shown.bs.collapse', () => {  // Bootstrap 4 Collapse method // Must be defined before the collapse is activated
        window.location.search ?
          checkForQuery(window.location.search.replace(queryStartRegex, ''), hash)
        : null; })
      .collapse('show'); // Bootstrap 4 Collapse method
    findContentTarget(hash);
  }
}

function checkForHash(e) {
  if (window.location.hash) {
    let hash = window.location.hash.replace(endingSlashRegex, '');

    checkForMatchingTabOrAccordion(hash);
  }
  return;
}

function initContentHashLink() {
  checkForHash();
  window.addEventListener('hashchange', checkForHash, false);
}

function contentHashLink() {
  if (!document.querySelector('#accordion') && !document.querySelector('.nav.nav-tabs'))
    return;
    
  initContentHashLink();
}

export default contentHashLink;