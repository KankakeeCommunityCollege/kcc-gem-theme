function replaceRegex(string, regex, replacement) {
  const newString = string.replace(regex, replacement);
  return newString;
}

function escapeCharacters(string, escapeOption) {
  const escapedCharactersObject = {
    '\\*': '__asterisk__',
    '\\_': '__underscore__',
    '\\[': '__openBracket__',
    '\\]': '__closeBracket__',
    '\\(': '__openParenthesis__',
    '\\)': '__closeParenthesis__'
  }

  for (let char in escapedCharactersObject) {
    if (escapedCharactersObject.hasOwnProperty(char)) {
      escapeOption === true ? string = replaceRegex(string, char, escapedCharactersObject[char])
      : escapeOption === false ? string = replaceRegex(string, escapedCharactersObject[char], char.replace(/^\\/g, ''))
      : null;
    }
  }
  return string;
}

function createAnchorElements(string) {
  return string = string.replace(/\[(?<linkText>[^\]]*)\]\((?<linkHref>[^\)]*)\)/g, '<a href="$<linkHref>" target="_blank" rel="noopener noreferrer">$<linkText></a>');
}

function createInlineElements(string) {
  const inlineElementObject = {
    'strong': /\*\*([^\*]*)\*\*/g,
    'em': /(?<!_)_([^_]*)(?<!_)_/g // That's some pretty intense RegEx right there: "Negative lookbehind" to omit the escaped characters
  }
  for (var el in inlineElementObject) {
    if (inlineElementObject.hasOwnProperty(el)) {
      string = string.replace(inlineElementObject[el], '<' + el + '>$1</' + el + '>' );
    }
  }
  return string;
}

function createParagraphElements(string) {
   return string = string.replace(/(?<!$)^(.*)(?<!^)$/gm, '<p class="typography__alert">$1</p>');
}

function parseMarkdownToHTML(string) {
  const escapedString = escapeCharacters(string, true);
  const stringWithInlineElements = createInlineElements(escapedString);
  const stringWithAnchorElements = createAnchorElements(stringWithInlineElements);
  const stringWithParagraphElements = createParagraphElements(stringWithAnchorElements);
  const unescapedString = escapeCharacters(stringWithParagraphElements, false);
  //console.log(unescapedString);
  return unescapedString;
}

//
//    USAGE:
//        import parseMarkdownToHTML from './parseMarkdownToHTML.js';
//
//        parseMarkdownToHTML(stringContainingSimplifiedMarkdown);

export default parseMarkdownToHTML;
