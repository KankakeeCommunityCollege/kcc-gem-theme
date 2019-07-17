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

function gscInit() {
  var cx = '006320264078644364913:sy48bet-lr8';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
}

function moveSearchIcon() {
  const pageHasGSearch = document.getElementById('searchCollapse');

  if ( pageHasGSearch ) {
    let initSearchPromise = new Promise((resolve, reject) => {
      gscInit();
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
                    resolve();
                }
            }
        };
        const observer = new MutationObserver(callback);
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
      });
    });
  }
}

export default moveSearchIcon;
