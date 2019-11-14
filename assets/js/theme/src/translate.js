function styleIFrameElement(IFRAME_MENU_ELEMENT, iframeStyles) {
  const currentStyles = IFRAME_MENU_ELEMENT.style.cssText;
  let currentStylesString = currentStyles.toString();
  const combinedStyles = currentStylesString += iframeStyles
  IFRAME_MENU_ELEMENT.setAttribute('style', combinedStyles);
}

function setIframeStyles() {
  const iframeStyles = ' height: 100%; width: 100%; top: 0px; box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3);';
  return iframeStyles;
}

function createStyleConfigurationObject() {
  const styleConfigurationObject = {  // Setting all the selectors & the styles they should get.
    '.goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *': 'color: #544F4B; font-family: "Roboto", sans-serif; width: 100%;',  // Change font fam and color!
    '.goog-te-menu2-item-selected': 'display: none;',       // Change menu's padding
    '.goog-te-menu2': 'overflow-y: scroll; padding: 0px;',  // Change menu's padding
    '.goog-te-menu2-item div': 'padding: 20px;',  // Change the padding of the languages
    '.goog-te-menu2-item': 'width: 100%;',          // Change the width of the languages
    'td': 'width: 100%; display: block;',           // Change the width of the languages
    '.goog-te-menu2-colpad': 'display: none;',      // Change the width of the languages
    '.goog-te-menu2': 'border: none;',  // Change Google's default blue border
    '.goog-te-menu2': 'height: 100%; width: 100%;'
  }
  return styleConfigurationObject;
}

function setStyles(selector, styles, IFRAME_MENU_ELEMENT) {
  const content = IFRAME_MENU_ELEMENT.contentWindow;
  const itemsToStyle = content.document.querySelectorAll(selector);
  for (let i = 0; i < itemsToStyle.length; i++) {
    const items = itemsToStyle[i];
    items.setAttribute('style', styles);
  }
}

function watchForMenuClicks() {
  // RESTYLE THE DROPDOWN MENU
  if (document.getElementById('google_translate_element')) {
    const GOOGLE_TRANSLATE_ELEMENT = document.getElementById('google_translate_element');
    const styleConfigurationObject = createStyleConfigurationObject();
    const iframeStyles = setIframeStyles();
    GOOGLE_TRANSLATE_ELEMENT.addEventListener('click', function (event) {
      const IFRAME_MENU_ELEMENT = document.querySelector('iframe[class*="goog-te-menu-frame"]');

      //event.preventDefault();
      styleIFrameElement(IFRAME_MENU_ELEMENT, iframeStyles);
      Object.keys(styleConfigurationObject).forEach(function(selector) {
        setStyles(selector, styleConfigurationObject[selector], IFRAME_MENU_ELEMENT);
      });

    }, false);
  }
}

export default watchForMenuClicks;
