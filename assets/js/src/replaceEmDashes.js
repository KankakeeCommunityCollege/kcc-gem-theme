// Replace all occurrences of "--" (double-hyphens,) within the page's text-nodes, with em-dashes.
// Replacer function to omits any occurrences of triple-hyphens, or escaped double-hyphens (\--).
// For example, YAML Front - matter's opening and closing triple-hyphens
const emDashOrTripleHyphensRegex = /\\?---?/g; // Escaping a double hyphen with a backslash prevents replacement.
const tripleHyphenRegex = /---/;
const emDashReplacement = '—' // This is an em-dash, however, it looks like a hyphen in monospace text editor font!

function replacerFunction(match) {
  let replacement;
  
  if (match.search(/\\--/g) !== -1) {
    return replacement = '--';
  } else if (match.search(tripleHyphenRegex) === -1) {
    return replacement = emDashReplacement;
  } else {
    return replacement = match;
  }
}
function replaceEmDashes(node) {
  if (node.nodeType == 3) {
    node.data = node.data.replace(emDashOrTripleHyphensRegex, replacerFunction);
  }
  if (node.nodeType == 1 && node.nodeName != 'SCRIPT') {
    for (var i = 0; i < node.childNodes.length; i++) {
      replaceEmDashes(node.childNodes[i]);
    }
  }
}
//  Note on usage: You don't need to necessarily traverse the entire document.body. 
//  Usage:
//
//    replaceEmDashes(document.body);
//
export default replaceEmDashes;
