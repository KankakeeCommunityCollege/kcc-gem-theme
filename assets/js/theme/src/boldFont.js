
function walkNodes(node) {
  if (node.nodeType == 3) { // is it a text node?
    const reg = /\*\*(\S+)\*\*/g;
    const replacement = '<span class="typography__power-text">$1</span>';
    const nodeContainsMatch = node.data.search(reg) != -1;
    if (nodeContainsMatch) {
      node.parentElement.innerHTML = node.parentElement.innerHTML.replace(reg, replacement);
    }
  }
  if (node.nodeType == 1 && node.nodeName != 'SCRIPT') {
    for (var i = 0; i < node.childNodes.length; i++) {
      walkNodes(node.childNodes[i]);
    }
  }
}

function regexText() {
  if ( document.querySelector('.hero-slider__slider') ) {
    const slider = document.querySelector('.hero-slider__slider');
    walkNodes(slider);
  }
}
//  USAGE:
//    document.addEventListener('DOMContentLoaded', function() [
//      regexText(document.body);
//    ]);
//
//
export default regexText;
