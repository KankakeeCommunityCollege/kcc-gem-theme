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
import Tab from 'bootstrap/js/dist/tab'; // Import Tab from Bootstrap 5

const idRegex = /.*[\?&]id=([^&]+).*$/;
const endingSlashRegex = /\/$/g;
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function focusElement(el) {
  el.focus();
  el.scrollIntoView({
    behavior: motionQuery.matches ? 'instant' : 'smooth',
    block: 'start'
  });
}

function processIdQuery(query, hash) {
  let id = query.replace(idRegex, `$1`);
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

function openAllAccordions(Collapse) {
  const accordions = document.querySelectorAll('#accordion .collapse');

  [...accordions].forEach(el => {
    const bsCollapse = new Collapse(el, { toggle: false });

    bsCollapse.show();
  })
}

function handleTabs(hash) {
  const tab = document.querySelector(`.nav-tabs [data-bs-target="${hash}"]`);
  const bsTab = new Tab(tab);

  tab.addEventListener('shown.bs.tab', _e => {
    if (window.location.search) {
      checkForQuery(window.location.search, hash);
    } else {
      findContentTarget(`${hash}-label`); // You need to .scrollIntoView() & .focus() on the tab-label which is an anchor or button. It won't work to do .scrollIntoView() and .focus() on the div
    }
  });
  
  bsTab.show();
}

function handleAccordions(hash, Collapse) {
  const card = document.querySelector(hash);
  const bsCard = new Collapse(card, {toggle: false});

  card.addEventListener('shown.bs.collapse', _e => {
    if (window.location.search) {
      checkForQuery(window.location.search, hash);
    } else {
      findContentTarget(`button[data-bs-target="${hash}"]`);
    }
  });

  bsCard.show();
}

function checkForMatchingTabOrAccordion(hash, Collapse) {
  if ( document.querySelector(`.nav-tabs [data-bs-target="${hash}"]`) ) {  // Looks for a matching BS5 tab element
    handleTabs(hash);
  } else if ( document.querySelector(`${hash}.collapse`) ) {  // Looks for a matching BS5 collapse element
    handleAccordions(hash, Collapse);
  } else if (hash === '#please-open-all-accordions') {
    // The #please-open-all-accordions hash is a helper for accessibility testing
    openAllAccordions(Collapse);
  }
}

function checkForHash(Collapse) {
  if (window.location.hash) {
    let hash = window.location.hash.replace(endingSlashRegex, '');

    checkForMatchingTabOrAccordion(hash, Collapse);
  }
  return;
}

function contentHashLink(Collapse) {
  checkForHash(Collapse);
  window.addEventListener('hashchange', _e => {
    checkForHash(Collapse);
  }, false);

  import('./addAccordionOrTabHistoryStates')
    .then(({ default: addAccordionOrTabHistoryStates }) => addAccordionOrTabHistoryStates());
}

export default contentHashLink;
