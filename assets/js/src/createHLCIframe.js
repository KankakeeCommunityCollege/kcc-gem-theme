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
  frame.width = '150';
  frame.height = '166';
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('allowtransparency', 'allowtransparency');
  frame.style.cssText = 'border-width: 0px; border-style: initial; border-color: initial; padding: 0px; margin: 0px;';
  frame.src = 'https://cdn.yoshki.com/iframe/54732.html';

  hlcIframeParent.innerHTML = ''; // remove the spinning loader image already in the DOM
  hlcIframeParent.appendChild(frame);
}

export default createHLCIframe;
