'use strict';

// function take a Wikimedia 'title' and returns only the 'extract' raw text
async function getQueryExtractSentence(title) {
  let fetchUrl =
    'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' +
    title +
    '&exsentences=1&exlimit=10&format=json&origin=*';

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

  // return 'extract' property content to the caller
  const regEx = /\"\<p.+p\>\"/i;
  const result = await textResult.match(regEx);
  return result;
}
