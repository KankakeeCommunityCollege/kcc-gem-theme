const ACCORDION_ID = 'accordion';
const TABS_SELECTOR = '.navTabs';

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
  
  const accordionIsOpening = !Boolean(JSON.parse(e.target.getAttribute('aria-expanded')));

  accordionIsOpening ? addHistoryState(e.target, e.target.dataset.target) : null;
}

function tabHandler(e) {
  let target = e.target;
  let targetHref = target.hash;

  addHistoryState(e.target, targetHref)
}

function watchElementForEvent(el, event, handler) {
  el.addEventListener(event, handler);
}

function addAccordionOrTabHistoryStates() {
  if (document.getElementById('accordion')) {
    const accordion = document.getElementById(ACCORDION_ID);

    watchElementForEvent(accordion, 'click', accordionHandler);
  }
  if (document.querySelector('.navTabs')) {
    const tabs = document.querySelector(TABS_SELECTOR);
  
    watchElementForEvent(tabs, 'click', tabHandler);
  }
}

export default addAccordionOrTabHistoryStates;
