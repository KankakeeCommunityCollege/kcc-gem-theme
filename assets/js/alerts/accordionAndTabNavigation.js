const ACCORDION_ID = 'accordion';
const TABS_SELECTOR = 'ul[role="tablist"]'

function accordionHandler(e) {
  const url = new URL(window.location)
  const target = e.target.dataset.target || e.target.href;

  console.log(target);

  let title = document.title + ' | ' + e.target.innerText;

  //window.history.pushState(state, title, url);
}

function accordionAndTabNavigation() {
  const accordion = document.getElementById(ACCORDION_ID);
  //const tab = document.querySelector(TABS_SELECTOR);

  //console.log(tab);


  tab.addEventListener('click', accordionHandler);
  accordion.addEventListener('click', accordionHandler);
}

export default accordionAndTabNavigation;