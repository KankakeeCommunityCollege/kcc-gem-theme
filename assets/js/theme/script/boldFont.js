function regexText(node) {
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
      regexText(node.childNodes[i]);
    }
  }
}
//  regexText(document.body);
export default regexText;
