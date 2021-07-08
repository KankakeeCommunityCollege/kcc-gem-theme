const ACCORDION_ID = 'accordion';
const TABS_SELECTOR = '.navTabs';

function addHistoryState(target, hashTarget) {
  let url = new URL(window.location);
  let state = {
    page: document.title,
    accordion: target.innerText.trim() // .trim() is needed b/c of the accordion's HTML--each accordion button's text is proceeded by a space
  };
  const title = '';

  url.hash = hashTarget;
  window.history.pushState(state, title, url);
}

function accordionHandler(e) {
  if ( !e.target.matches('.accordion__button') )
    return;
  
  const accordionIsOpening = !Boolean(JSON.parse(e.target.getAttribute('aria-expanded')));

  accordionIsOpening ? addHistoryState(e.target, e.target.dataset.target) : null;
}

function tabHandler(e) {
  let target = e.target;
  let targetHref = target.hash;

  addHistoryState(e.target, targetHref)
}

function addAccordionOrTabHistoryStates() {
  if (document.getElementById(ACCORDION_ID)) {
    const accordion = document.getElementById(ACCORDION_ID);

    accordion.addEventListener('click', accordionHandler);
  }
  if (document.querySelector(TABS_SELECTOR)) {
    const tabs = document.querySelector(TABS_SELECTOR);
  
    tabs.addEventListener('click', tabHandler);
  }
}

export default addAccordionOrTabHistoryStates;