'use strict';

// queries Wikimedia API for a title and returns arrays of title and document hyperlinks
async function getOpenSearchTitles(title) {
  let fetchUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    title +
    '&format=json&origin=*';

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
      return response.json();
    })
    .catch((err) => {
      console.error(`Fetch problem: ${err.message}`);
    });

  if (Array.isArray(fetchResult) == false || fetchResult.length < 1) {
    return [];
  }

  // arrange the result in a 2-d array of [[title, title, ...], [url, url, ...]]
  const result = [fetchResult[1], fetchResult[3]];
  return result;
}
