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

// NOTE on HLC iframe accessibility fix:
//   The HLC iframe has 2 links with no href nor link text (an obvious WCAG 2.1 AA violation).
//   To resolve this accessibility issue, we nee do hide the offending iframe and offer a link
//    to our HLC accreditation page to accomplish the same functionality for users of screen readers.
//   The parent element is given aria-hidden="true" to hide it and the iframe tabindex="-1" to prevent focus.
//   The `_includes/footer.html` has a link to our HLC status page.
function createHLCIframe() {
  const frame = document.createElement('iframe');

  frame.title = 'Higher Learning Commission Accreditation Status';
  frame.width = '150';
  frame.height = '166';
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('allowtransparency', 'allowtransparency');
  frame.style.cssText = 'border-width: 0px; border-style: initial; border-color: initial; padding: 0px; margin: 0px;';
  frame.tabIndex = -1; // Prevent focus of iframe since it has accessibility issues
  frame.src = 'https://cdn.yoshki.com/iframe/54732.html';

  hlcIframeParent.innerHTML = ''; // remove the spinning loader image already in the DOM
  hlcIframeParent.appendChild(frame);
  hlcIframeParent.setAttribute('aria-hidden', 'true'); // Hide the iframe from screen readers since it has accessibility issues
}

export default createHLCIframe;
