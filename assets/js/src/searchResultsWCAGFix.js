// ============================================================================ //
// # Fix Google Programmable Search's search results that have image thumbnails //
//                                                                              //
// ## The Issue                                                                 //
//                                                                              //
// On the search results page:                                                  //
// * Image thumbs are wrapped in anchor/link elements                           //
// * Thumbs have generic "Thumbnail image" for alt-text                         //
// * Thumb anchors do not have any accessibility labels so multiple             //
//   "Thumbnail image" link texts do not help                                   //
// * Thumb anchors also provide zero visual indication of focus (or that        //
//   they're a link at all unless you hover them to see the cursor change)      //
//                                                                              //
// ## The Fix                                                                   //
//                                                                              //
// 1. Use a lightweight mutation observer to see when search results have       //
//    been injected. (also runs on subsequent searches while in the page)       //
// 2. Look for the links wrapping the image thumbnails:                         //
//    * Make un-focusable with tabindex="-1"                                    //
//    * Add aria-hidden="true" to hide the unhelpful thumbs altogether          //
// ============================================================================ //

// This is a custom wrapper element for the markup where Google injects the search results
const targetNode = document.getElementById('searchResultsWrapper');
  
const observer = new MutationObserver((mutationsList) => {
  // Target the specific wrapper classes Google uses for image result boxes
  const imageLinks = document.querySelectorAll('.gs-image-box a');
  
  imageLinks.forEach(link => {
    if (link.getAttribute('tabindex') !== '-1') {
      link.setAttribute('tabindex', '-1');
      link.setAttribute('aria-hidden', 'true');
    }
  });
});

function searchResultsWCAGFix() {
  // Watch for injection of the search results
  observer.observe(targetNode, { childList: true, subtree: true });
}

export default searchResultsWCAGFix;
