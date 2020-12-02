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

function processIdQuery(query, hash) {
  let id = query.replace(idRegex, '');
  const parentEl = document.querySelector(hash);
  const heading = parentEl.querySelector(`#${id}`);

  heading.scrollIntoView()
  heading.focus();
}

function checkForQuery(query, hash) {
  query.search(idRegex) !== -1 ?
    processIdQuery(query, hash)
  : null;
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
  } else if ( document.querySelector(`${hash}.collapse`) ) {  // Looks for a matching BS4 collapse element
    let card = $(hash);  // **SIGH**, BS4 requires JQuery

    card
      .on('shown.bs.collapse', () => {  // Bootstrap 4 Collapse method // Must be defined before the collapse is activated
        window.location.search ?
          checkForQuery(window.location.search.replace(queryStartRegex, ''), hash)
        : null; })
      .collapse('show'); // Bootstrap 4 Collapse method
      const target = document.querySelector(hash);
      
      target.scrollIntoView();
      target.focus(); // For screen readers
  }
}

function checkForHash(e) {
  // Select the node that will be observed for mutations

  if (window.location.hash) {
    let hash = window.location.hash.replace(endingSlashRegex, '');

    checkForMatchingTabOrAccordion(hash);
  }
  return;
}

function initTabs() {
  checkForHash();
  window.addEventListener('hashchange', checkForHash, false);
}

function makeTabsLinkable() {
  if (!document.querySelector('#accordion') && !document.querySelector('.nav.nav-tabs'))
    return;
    
  initTabs();
}

export default makeTabsLinkable;