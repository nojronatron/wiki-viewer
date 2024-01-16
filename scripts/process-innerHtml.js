'use strict';

// function takes possible html string and removes html elements and other non-text characters
function removeHtmlElements(data) {
  const innerHtml = String(data);
  const htmlElementsRegex = /\<.+?\>|\<\\.+?\>/gi;
  const noElements = innerHtml.replace(htmlElementsRegex, '');
  const quoteRegex = /&quot;/gi;
  const quoteChars = noElements.replace(quoteRegex, '"');
  const regexSpaces = /\s{2}/gi;
  const normalizedSpaces = quoteChars.replace(regexSpaces, ' ');
  const regexNewlineChars = /\\n/gi;
  const strippedNewLineChars = normalizedSpaces.replace(regexNewlineChars, '');
  return strippedNewLineChars;
}
