'use strict';

async function getRandomReferences() {
  console.log('entered getRandomReferences()');

  const randRefs = await getRandomRefs();
  console.log('randRefs: ', randRefs);
  const articleId = randRefs[0];
  const articleTitle = randRefs[1];
  console.log('articleId: ' + articleId);
  console.log('articleTile: ' + articleTitle);

  const articleFullUrl = await getArticleUrl(articleId, articleTitle);
  console.log('received linkUrlArr from getArticleUrl: ' + articleFullUrl);

  // create a hidden link element for navigation to random article
  const hiddenLink = document.createElement('a');
  hiddenLink.setAttribute('href', articleFullUrl);
  hiddenLink.setAttribute('target', '_self');

  // click the link element
  hiddenLink.click();
  return true;
}

async function getRandomRefs() {
  console.log('entered getRandomRefs function.');
  // example random article query: https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1
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

  // console.log('fetchResult is now: ' + fetchResult);
  const queryRandomZeroId = fetchResult[0].id;
  const queryRandomZeroTitle = fetchResult[0].title;
  // console.log('queryRandom0Id: ' + queryRandomZeroId);
  // console.log('queryRandomZeroTitle: ' + queryRandomZeroTitle);
  return [queryRandomZeroId, queryRandomZeroTitle];
}

async function getArticleUrl(pageId, title) {
  if (title === undefined || title.length < 1) {
    return '';
  }

  console.log('getArticleUri title, id: ' + title, pageId);

  // api.php?action=query&prop=info&inprop=protection&titles=MediaWiki
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

// fetch(url)
//     .then(function(response){return response.json();})
//     .then(function(response) {
//         var pages = response.query.pages;
//         for (var p in pages) {
//             console.log(pages[p].title + " has " + pages[p].length + " bytes.");
//         }
//     })
//     .catch(function(error){console.log(error);});

// example json
// {
//   'batchcomplete': '',
//   'query': {
//     'pages': {
//       '5618516': {
//         'pageid': 5618516,
//         'ns': 1,
//         'title': 'Talk:David Dreman',
//         'contentmodel': 'wikitext',
//         'pagelanguage': 'en',
//         'pagelanguagehtmlcode': 'en',
//         'pagelanguagedir': 'ltr',
//         'touched': '2024-01-11T15:35:27Z',
//         'lastrevid': 659165146,
//         'length': 1999,
//         'fullurl': 'https://en.wikipedia.org/wiki/Talk:David_Dreman',
//         'editurl': 'https://en.wikipedia.org/w/index.php?title=Talk:David_Dreman&action=edit',
//         'canonicalurl': 'https://en.wikipedia.org/wiki/Talk:David_Dreman'
//       }
//     }
//   }
// }
