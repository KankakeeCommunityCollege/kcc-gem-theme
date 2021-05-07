// Since mobile users cannot hover over the settings link to make it visible:
// This JS makes the setting-link visible when mobile users hit the bottom of the page.

function toggleLinkVisibility(el) {
  el.classList.toggle('setting__video--visible'); // Class toggles the visibility
}

function wait(el) {
  window.setTimeout(() => { // A short timeout to add to the "effect"
    toggleLinkVisibility(el);
  }, 650);
}

function scrollHandler(e) {
  const SETTINGS_LINK = document.querySelector('.setting__video'); // Built into HTML DOM
  (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? wait(SETTINGS_LINK)
    : null;
  (window.innerHeight + window.scrollY) < document.body.offsetHeight ? toggleLinkVisibility(SETTINGS_LINK)
    : null;
}

function toggleSettingVisibilityOnScrollBottom() {
  window.addEventListener('scroll', scrollHandler);
}

export default toggleSettingVisibilityOnScrollBottom;