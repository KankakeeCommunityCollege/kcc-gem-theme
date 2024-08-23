const googleTranslateElement = document.getElementById('google_translate_element');
const styleConfigurationObject = {  // Setting all the selectors & the styles they should get.
    'div.VIpgJd-ZVi9od-vH1Gmf *': 'color: #544F4B; font-family: "Roboto", sans-serif; width: 100%;',  // Change font fam and color!
    'span.indicator': 'display: none;',       // Change menu's padding
    'div.VIpgJd-ZVi9od-vH1Gmf': 'overflow-y: scroll; padding: 0px;',  // Change menu's padding
    'div.VIpgJd-ZVi9od-vH1Gmf a div': 'padding: 20px; width: 100%;',  // Change the padding of the languages
    '.goog-te-menu2-item': 'width: 100%;',          // Change the width of the languages
    'td': 'width: 100%; display: block;',           // Change the width of the languages
    'td.VIpgJd-ZVi9od-vH1Gmf-KrhPNb': 'display: none;',
    '.goog-te-menu2-colpad': 'display: none;',      // Change the width of the languages
    'div.VIpgJd-ZVi9od-vH1Gmf': 'border: none;',  // Change Google's default blue border
    'body': 'background-color: #fff; box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3);',
  };

function styleIFrameElement(iframe, iframeStyles) {
  const combinedStyles = iframe.style.cssText + iframeStyles;

  iframe.style = combinedStyles;
}

function setStyles(selector, styles, iframeMenuElement) {
  const content = iframeMenuElement.contentWindow;
  const itemsToStyle = content.document.querySelectorAll(selector);

  [...itemsToStyle].forEach(item => item.style = styles);
}

function translate() {
  const iframeStyles = ' height: 100%; width: 100%; top: 0px; box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3);';
  
  googleTranslateElement.addEventListener('click', _e => {
    const iframeMenuElement = document.querySelector('iframe[title="Language Translate Widget"]');

    // Use this log to find translate menu elements:
    // console.log(iframeMenuElement.contentWindow.document.body);

    // Target the anchor elements in the translate menu (language options)
    const anchors = iframeMenuElement.contentWindow.document.body.querySelectorAll('.VIpgJd-ZVi9od-vH1Gmf a');
    // Color the menu text white when an element is hovered:
    [...anchors].forEach(a => {
      a.addEventListener('mouseenter', () => {
        if (a.querySelector('span.text').innerHTML !== 'Select Language') {
          a.querySelector('span.text').style = 'color: #fff;';
        }
      })
      a.addEventListener('mouseleave', () => {
        if (a.querySelector('span.text').innerHTML !== 'Select Language') {
          a.querySelector('span.text').style = 'color: #544F4B;';
        }
      })
    });

    styleIFrameElement(iframeMenuElement, iframeStyles);

    Object.keys(styleConfigurationObject).forEach(selector => {
      setStyles(selector, styleConfigurationObject[selector], iframeMenuElement);
    });

  }, false);
}

export default translate;
