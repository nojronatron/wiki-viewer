// function takes possible html string and removes elements, retaining the text content
function removeElements(innerHtml) {
  const htmlElementsRegEx = /\<.+?\>|\<\\.+?\>/gi;
  const noElements = innerHtml.replace(htmlElementsRegEx, '');
  const quoteRegex = /&quot;/gi;
  const quoteChars = noElements.replace(quoteRegex, '"');
  const regExSpaces = /\s{2}/gi;
  const normalizedSpaces = quoteChars.replace(regExSpaces, ' ');
  return normalizedSpaces;
}
