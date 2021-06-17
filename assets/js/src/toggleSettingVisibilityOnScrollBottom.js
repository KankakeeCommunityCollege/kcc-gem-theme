// Since mobile users cannot hover over the settings link to make it visible:
// This JS makes the setting-link visible when mobile users hit the bottom of the page.
const SETTINGS_LINK_QUERY = '.setting__link'; // Built into HTML DOM

function toggleLinkVisibility(el) {
  el.classList.toggle('setting__link--visible');

  window.setTimeout(() => {
    el.classList.toggle('setting__link--visible');
  }, 4000);
}

function wait(el) {
  window.setTimeout(() => { // A short timeout to add to the "effect"
    toggleLinkVisibility(el);
  }, 300);
}

function passiveEventSupport() {
  let passiveSupported = false;

  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch(err) {
    return passiveSupported = false;
  }
  return passiveSupported;
}

function scrollHandler() {
  const settingLink = document.querySelector(SETTINGS_LINK_QUERY);
  const scrolledToBottom = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight

  scrolledToBottom ? wait(settingLink) : null;
}

function toggleSettingVisibilityOnScrollBottom() {
  if ( !document.querySelector(SETTINGS_LINK_QUERY) )
    return;

  window.addEventListener('scroll', scrollHandler, passiveEventSupport() ? { passive: true } : false );
  
}

export default toggleSettingVisibilityOnScrollBottom;