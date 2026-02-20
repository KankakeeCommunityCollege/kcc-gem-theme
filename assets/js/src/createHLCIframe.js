const hlcIframeParent = document.getElementById('hlcIframeParent');

// Original embed HTML provided to web services for adding the HLC verification iframe //
// const iframeHTML = `<iframe
//   title="Higher Learning Commission Accreditation Status"
//   width="150"
//   height="166"
//   src="https://cdn.yoshki.com/iframe/54732.html"
//   frameborder="0"
//   scrolling="no"
//   allowtransparency="allowtransparency"
//   style="border-width: 0px; border-style: initial; border-color: initial; padding: 0px; margin: 0px;"
// ></iframe>`;

function createHLCIframe() {
  const frame = document.createElement('iframe');

  frame.title = 'Higher Learning Commission Accreditation Status';
  // Hack to prevent focus of the iframe because the HLC iframe contents is not WCAG 2.1 AA compliant. (2 anchors with no link-text, href, nor label)
  // There is a hard-coded link in the HTML that provides the same functionality. (By preventing focus we ensure screen readers can't get caught in the non-compliant iframe contents)
  frame.tabIndex = -1; // Prevent focus of elements hidden from assistive tech. (**see note below on aria-hidden="true")
  frame.width = '150';
  frame.height = '166';
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('allowtransparency', 'allowtransparency');
  frame.style.cssText = 'border-width: 0px; border-style: initial; border-color: initial; padding: 0px; margin: 0px;';
  frame.src = 'https://cdn.yoshki.com/iframe/54732.html';

  // Hack to hide the iframe from screen reader users (**see note above on `tabIndex = -1`).
  // This is needed b/c the iframe is not WCAG 2.1 AA compliant (an anchor is in the footer [HTML] to provide the same functionality)
  hlcIframeParent.setAttribute('aria-hidden', 'true'); // Hide iframe (and parent) from assistive tech. tabindex="-1" prevents focusing of hidden iframe sibling.
  hlcIframeParent.innerHTML = ''; // remove the spinning loader image already in the DOM
  hlcIframeParent.appendChild(frame);
}

export default createHLCIframe;
