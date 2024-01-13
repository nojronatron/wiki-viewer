'use strict';
/* request: http://en.wikipedia.org/w/api.php?action=opensearch&search=boeing&format=json

json: [	"boeing",
	[
		"Boeing",
		"Boeing 737 MAX",
		...
	],
	[
		"",
		...
	],
	[
		"https://en.wikipedia.org/wiki/Boeing",
		"https://en.wikipedia.org/wiki/Boeing_737_MAX",
		...
	]
]
*/

async function getOpenSearchTitles(title) {
  // console.log('openSearchTitle param is' + title);

  let fetchUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    title +
    '&format=json&origin=*';
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
      return response.json();
    })
    .catch((err) => {
      console.error(`Fetch problem: ${err.message}`);
    });

  // console.log(`opensearch-title fetch returned: ` + fetchResult);

  if (Array.isArray(fetchResult) == false || fetchResult.length < 1) {
    return [];
  }

  const result = [fetchResult[1], fetchResult[3]];
  // console.log('opensearch title 2-d array "result[0]" : ' + result[0]);
  // console.log('opensearch title 2-day array "result[1]" : ' + result[1]);

  return result;
}
