// Replace all occurences of "--" (double hyphens) with "—" (long-em dash)
const regex = /--/g;
const replacement = '—'; // That's an em-dash, which will look like a regular dash in a fixed-width font

function walkText(node) {
  if (node.nodeType == 3) {
    node.data = node.data.replace(regex, replacement);
  }
  if (node.nodeType == 1 && node.nodeName != 'SCRIPT') {
    for (let i = 0, len = node.childNodes.length; i < len; i++) {
      walkText(node.childNodes[i]);
    }
  }
}
//  Usage:
//
//    walkText(document.body);
//
export default walkText;
