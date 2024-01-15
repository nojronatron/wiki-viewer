'use strict';

async function getRandomReferences() {
  const randRefs = await getRandomRefs();
  const articleTitle = randRefs[1];
  const articleFullUrl = await getArticleUrl(articleTitle);

  // create a hidden link element for navigation to random article
  const hiddenLink = document.createElement('a');
  hiddenLink.setAttribute('href', articleFullUrl);
  hiddenLink.setAttribute('target', '_self');

  // click the link element
  hiddenLink.click();
  return true;
}

// get a title and id of a randomly selected Wiki article
async function getRandomRefs() {
  console.log('entered getRandomRefs function.');

  const url =
    'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnlimit=1';

  const headerList = {
    Accept: '*/*',
    'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
  };

  const fetchOptions = {
    method: 'GET',
    headers: headerList,
  };

  const fetchResult = await fetch(url, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch HTTP Error: ${response.Error}`);
      }
      return response.json();
    })
    .then((jsonData) => jsonData.query.random)
    .catch((err) => {
      console.error(`Fetch problem in getRandomRefs(): ${err.message}`);
    });

  const queryRandomZeroId = fetchResult[0].id;
  const queryRandomZeroTitle = fetchResult[0].title;
  return [queryRandomZeroId, queryRandomZeroTitle];
}

// accept an article title and return the full URL to the Wiki entry
async function getArticleUrl(title) {
  if (title === undefined || title.length < 1) {
    return '';
  }

  const queryArticleUrl =
    'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&titles=' +
    title +
    '&prop=info&inprop=url';

  const queryArticleHeaders = {
    Accept: '*/*',
    'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
  };

  const queryArticleFetchOptions = {
    method: 'GET',
    headers: queryArticleHeaders,
  };

  const fetchArticleUriResult = await fetch(
    queryArticleUrl,
    queryArticleFetchOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch HTTP Error: ${response.Error}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      let pages = jsonData.query.pages;
      const pagesArr = [];
      for (let page in pages) {
        pagesArr.push(pages[page].fullurl);
      }
      return pagesArr;
    })
    .catch((err) => {
      console.error(`Fetch problem in getArticleUrl(): ${err.message}`);
    });

  if (
    fetchArticleUriResult === 'undefined' ||
    !Array.isArray(fetchArticleUriResult)
  ) {
    console.log(
      'fetchArticleUriResult might be empty: ' + fetchArticleUriResult
    );
  }

  return fetchArticleUriResult;
}
