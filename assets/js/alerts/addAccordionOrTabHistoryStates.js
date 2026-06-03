const accordionId = 'accordion';
const tabsSelector = '.navTabs';

function addHistoryState(target, hashTarget) {
  let url = new URL(window.location);
  let state = {
    page: document.title,
    accordion: target.innerText.trim() // .trim() is needed b/c of the accordion's HTML--each accordion button's text is proceeded by a space
  };
  const title = ''; // Pass empty string as pushState() title parameter

  url.search = ''; // Remove any searchParams/queries from the URL (e.g. /?id=heading#page)
  url.hash = hashTarget;
  window.history.pushState(state, title, url);
}

function accordionHandler(e) {
  if ( !e.target.matches('.accordion__button') )
    return;
  
  const accordionIsOpening = Boolean(JSON.parse(e.target.getAttribute('aria-expanded')));

  if (accordionIsOpening) {
    addHistoryState(e.target, e.target.dataset.bsTarget);
  }
}

function tabHandler(e) {
  let tabTarget = e.target.dataset.bsTarget;

  addHistoryState(e.target, tabTarget);
}

function addAccordionOrTabHistoryStates() {
  if (document.getElementById('accordion')) {
    const accordion = document.getElementById(accordionId);

    accordion.addEventListener('click', accordionHandler);
  }
  if (document.querySelector('.navTabs')) {
    const tabs = document.querySelector(tabsSelector);
  
    tabs.addEventListener('click', tabHandler);
  }
}

export default addAccordionOrTabHistoryStates;
