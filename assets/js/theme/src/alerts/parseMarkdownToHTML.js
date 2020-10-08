const INLINE_MARKDOWN_ELEMENTS_OBJECT = {
  'strong': /\*\*([^\*]*)\*\*/g,
  'em': /_([^_]*)_/g
}

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

function replacer(match, p1) {
  if ( p1 === '' ) { // Filters out the '__' (double underscore) matches.
    return match;
  } else {
    for (var el in INLINE_MARKDOWN_ELEMENTS_OBJECT) {
      if (INLINE_MARKDOWN_ELEMENTS_OBJECT.hasOwnProperty(el)) {
        match = match.replace(INLINE_MARKDOWN_ELEMENTS_OBJECT[el], '<' + el + '>$1</' + el + '>' );
      }
    }
    return match;
  }
}

function createInlineElements(string) {
  for (var el in INLINE_MARKDOWN_ELEMENTS_OBJECT) {
    if (INLINE_MARKDOWN_ELEMENTS_OBJECT.hasOwnProperty(el)) {
      string = string.replace(INLINE_MARKDOWN_ELEMENTS_OBJECT[el], replacer);
    }
  }
  return string;
}

function paragraphReplacer(match, p1) {
  if ( p1 === '' ) { // Filters out blank lines
    return match;
  } else {
    return match.replace(/^(.*)$/gm, '<p class="typography__alert">$1</p>');
  }
}

function createParagraphElements(string) {
   return string = string.replace(/^(.*)$/gm, paragraphReplacer);
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
