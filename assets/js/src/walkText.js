// Replace all occurences of "--" (double-hyphens,) within the page's text-nodes, with em-dashes.
// Use a replacer function to omit any occurences of triple-hyphens which appear in our documentation.
// For example, YAML Front - matter's opening and closing triple-hyphens
// Without the replacer funciton, triple-hyphens get replaced with an em-dash and a hyphen.
const emDashOrTripleHyphensRegex = /---?/g;
const tripleHyphenRegex = /---/;
const emDashReplacement = '—' // This is an em-dash, however, it looks like a hyphen in monospace text editor font!

function replacerFunction(match) {
  return match.search(tripleHyphenRegex) === -1 ? emDashReplacement : match;
}
function walkText(node) {
  if (node.nodeType == 3) {
    node.data = node.data.replace(emDashOrTripleHyphensRegex, replacerFunction);
  }
  if (node.nodeType == 1 && node.nodeName != 'SCRIPT') {
    for (var i = 0; i < node.childNodes.length; i++) {
      walkText(node.childNodes[i]);
    }
  }
}
//  Note on usage: You don't need to necessarily traverse the entire document.body. 
//  Usage:
//
//    walkText(document.body);
//
export default walkText;
