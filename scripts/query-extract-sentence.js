'use strict';

// function takes a Wikimedia 'title' and returns only the Extract Text
async function getQueryExtractSentence(title) {
  let queryExtractUrl =
    'http://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro=true&explaintext=true&titles=' +
    title +
    '&format=json';

  let queryExtractHeaders = {
    Accept: '*/*',
    'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
  };

  const queryExtractFetchResult = await fetch(queryExtractUrl, {
    method: 'GET',
    headers: queryExtractHeaders,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch HTTP Error: ${response.Error}`);
      }
      return response;
    })
    .then((data) => data.json())
    .catch((err) => {
      console.error(
        `Fetch problem in getQueryExtractSentence(): ${err.message}`
      );
    });

  const jsonResult = JSON.stringify(queryExtractFetchResult, null, 2);
  const regex = /(?:"extract":)(?<sentence>\s".*")/i; // note: case-insensitivity
  const matches = jsonResult.match(regex).toString();
  const extractText = matches.replace(/"extract": "/, '');
  return extractText;
}
