const ACCORDION = document.querySelector('.accordion');

function addHistoryState(target, hashTarget) {
  console.log(target);
  console.log(hashTarget);
  
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

function clickHandler(e) {
  console.log(e);
  
  if ( !e.target.matches('.accordion-button') )
    return;

  if (JSON.parse(e.target.getAttribute('aria-expanded'))) {
    addHistoryState(e.target, e.target.dataset.bsTarget);
  }
}

function handleAccordionLinks() {
  ACCORDION.addEventListener('click', clickHandler);
}

export default handleAccordionLinks;