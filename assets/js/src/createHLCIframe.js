const hlcIframeParent = document.getElementById('hlcIframeParent');

// Original embed HTML provided to web services for adding the HLC verification iframe //
// const iframeHTML = `<!-- Start of HLC Accreditation Mark Digital Badge code -->
// <div class="mx-auto" style="width:100%;max-width:150px;max-height:166px;">
//   <div style="position: relative;padding-bottom: 110.67%;height: auto;overflow: hidden;">
//     <iframe
//       id="HLC"
//       src="https://cdn2.yoshki.com/badgeframe?34"
//       style="overflow: hidden;border:0px; margin:0px; padding:0px; background-color:transparent; top:0px; left:0px; width:100%; height:100%; position: absolute;"
//       title="Higher Learning Commission Accreditation Status"
//     ></iframe>
//   </div>
// </div>
// <!-- End of HLC Accreditation Mark Digital Badge code -->`;

function createHLCIframe() {
  const startComment = document.createComment('Start of HLC Accreditation Mark Digital Badge code');
  const endComment = document.createComment('End of HLC Accreditation Mark Digital Badge code');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const frame = document.createElement('iframe');

  div1.classList.add('mx-auto');
  div1.style.cssText = 'width:100%;max-width:150px;max-height:166px;';

  div2.style.cssText = 'position: relative;padding-bottom: 110.67%;height: auto;overflow: hidden;';

  frame.id = 'HLC';
  frame.style.cssText = 'overflow: hidden;border:0px; margin:0px; padding:0px; background-color:transparent; top:0px; left:0px; width:100%; height:100%; position: absolute;';
  frame.title = 'Higher Learning Commission Accreditation Status';
  frame.src = 'https://cdn2.yoshki.com/badgeframe?34';

  div2.append(frame);
  div1.append(div2);
  hlcIframeParent.replaceChildren(startComment, div1, endComment);
}

export default createHLCIframe;
