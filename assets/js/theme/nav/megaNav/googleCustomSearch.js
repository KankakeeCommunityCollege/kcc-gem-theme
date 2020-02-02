import initSearchToggle from './searchToggleMegaNav.js';

const FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR = [
  '#gsc-i-id1',
  '#gs_st50 .gsst_a',
  '.gsc-search-button .gsc-search-button.gsc-search-button-v2'
];
const SEARCH_INPUT_ID = 'gsc-i-id1';  // ID OF THE GOOGLE CUSTOM SEARCH (GCS) INPUT ELEMENT // Not in the DOM until the GCS JS fires `gcsInit()`
const SEARCH_DIV_WRAPPER_ID = 'searchCollapse';  // ID OF THE DIV BUILT INTO THE SITES HTML WHICH WRAPS THE GCS

function checkXIcon() {
  const checkXIconOnLoad = (function() {
      let executed = false;
      return function() {
          if (!executed) {
              executed = true;
              // do checkXIconOnLoad
              const icon = document.getElementById('xIcon');
              const xIsHidden = icon.getAttribute('style') === 'display: none;';
              xIsHidden ? removeClear() : clearXIcon();
          }
      };
  })();
  checkXIconOnLoad(); // "do checkXIconOnLoad" happens
}

function clearXIcon() {
  const targetEl = document.querySelector('button.gsc-search-button-v2');
  targetEl.classList.add('gsc-overrides__clear-x');
}

function removeClear() {
  const targetEl = document.querySelector('button.gsc-search-button-v2');
  targetEl.classList.remove('gsc-overrides__clear-x');
}

function addId() {
  const xIcon = document.querySelector('.gsst_a');
  xIcon.setAttribute('id', 'xIcon');
}

function addAttribute(selector, attr, val) {
  const el = document.querySelector(selector);

  el.setAttribute(attr, val);
}

function gcsInit() {  // Init The GCS JS
  var cx = '006320264078644364913:sy48bet-lr8';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
}

function googleCustomSearchInit() {
  if ( document.getElementById(SEARCH_DIV_WRAPPER_ID) ) {
    let initSearchPromise = new Promise((resolve, reject) => {
      gcsInit();
      resolve();
    });
    initSearchPromise.then(() => {
      let addIdPromise = new Promise((resolve, reject) => {

        const targetNode = document.getElementById('searchCollapse');
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                if (mutation.type == 'childList') {
                  addId();
                  let len = FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR.length;
                  for (var i = 0; i < len; i++) {
                    addAttribute(FOCUSABLE_GOOGLE_CUSTOM_SEARCH_SELECTORS_ARR[i], 'tabindex', '-1'); // Make Elements initially unfocusable, so that screen readers don't pick up the hidden GCS
                  }
                  resolve();
                }
            }
        };
        const observer = new MutationObserver(callback);  // Using a MutationObserver to watch for changes in the Google Custom Search Elements that got built into the page from `gcsInit()`
        observer.observe(targetNode, config);
        // Later, you can stop observing
        //observer.disconnect();
      });
      addIdPromise.then(() => {
        checkXIcon();
        const targetNode = document.getElementById('xIcon');
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                if (mutation.type == 'attributes') {
                  const xIsHidden = targetNode.getAttribute('style') === 'display: none;';
                  if (xIsHidden) {
                    removeClear();
                  } else {
                    clearXIcon();
                  }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        // Later, you can stop observing
        //observer.disconnect();
        initSearchToggle();
      });
    });
  }
}

export default googleCustomSearchInit;
