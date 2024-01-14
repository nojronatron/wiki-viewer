'use strict';
// Request: http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Boeing&exsentences=1&exlimit=10&format=json
//
// json: {
//   "batchcomplete": "",
//   "warnings": {
//     "extracts": {
//       "*": "The \"exsentences\" parameter may have unexpected results when used in HTML mode.\nHTML may be malformed and/or unbalanced and may omit inline images. Use at your own risk. Known problems are listed at https://www.mediawiki.org/wiki/Special:MyLanguage/Extension:TextExtracts#Caveats."
//     }
//   },
//   "query": {
//     "pages": {
//       "18933266": {
//         "pageid": 18933266,
//         "ns": 0,
//         "title": "Boeing",
//         "extract": "<p class=\"mw-empty-elt\">\n\n</p>\n<p><b>The Boeing Company</b> (<span></span>) is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, telecommunications equipment, and missiles worldwide.</p>"
//       }
//     }
//   }
// }

async function getQueryExtractSentence(title) {
  // console.log('queryExtractSentence param is' + title);

  let fetchUrl =
    'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' +
    title +
    '&exsentences=1&exlimit=10&format=json&origin=*';
  // console.log(`concatenated url: ${fetchUrl}`);

  let headersList = {
    Accept: '*/*',
    'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
  };

  const fetchResult = await fetch(fetchUrl, {
    method: 'GET',
    headers: headersList,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch HTTP Error: ${response.Error}`);
      }
      return response;
    })
    .catch((err) => {
      console.error(`Fetch problem: ${err.message}`);
    });

  let textResult = await fetchResult.text();

  // return property 'extract' to the caller
  // console.log('query extract sentence fetchResult text: ' + textResult);
  const regEx = /\"\<p.+p\>\"/i;
  const result = await textResult.match(regEx);

  console.log('query extract sentence regEx matcher will return ' + result);
  return result;
}
