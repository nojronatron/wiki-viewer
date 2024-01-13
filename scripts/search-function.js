'use strict';

// get a ref to the form
let form = document.querySelector('#docSearchForm');
// get a ref to the random article button
let randButton = document.querySelector('#clickRandomArticle');

// register an event handlers
form.addEventListener('submit', formSubmitHandler, false);
randButton.addEventListener('click', getRandomArticle, false);

async function formSubmitHandler(event) {
  event.preventDefault();
  const userInput = event.target.queryInput.value;
  const openSearchJson = await getOpenSearchTitles(userInput);
  if (openSearchJson.length < 1) {
    // todo: notify user something went wrong
    return;
  }

  // openSearchJson should be [ [title1, title2, ...], [url1, url2, ...]]
  // for each title in array[0] get the article extract sentence
  // console.log(
  //   'search-function formatSubmitHandler openSearchJason[0]: ' +
  //     openSearchJson[0]
  // );
  // console.log(
  //   'search-function formatSubmitHandler openSearchJason[1]: ' +
  //     openSearchJson[1]
  // );

  const extractSentences = [];
  openSearchJson[1].forEach(async (title) => {
    extractSentences.push(await getQueryExtractSentence(title));
  });

  console.log('formSubmitHandler extractSentences array: ' + extractSentences);

  // paste-together arrays like: [ [title1, title2, ...], [url1, url2, ...], [extract1, extract2, ...]]
  const conjugatedResults = [
    openSearchJson[0],
    openSearchJson[1],
    extractSentences,
  ];
  console.log(
    'formSubmitHandler conjugated multi-d array: ' + conjugatedResults
  );

  // todo: call displayResult function to write-out results to web-page
  // array of [titles], [urls], [sentence extracts]
  displayResult(conjugatedResults);
}

async function getRandomArticle(event) {
  event.preventDefault();
  // call getRandomArticle() to get a link
  // launch the link (in a new browser window?)
}

async function displayResult(data) {
  console.log('displayResult() param is: ', data);
  // validate input is json, and not blank or an error
  const resultSection = document.getElementById('resultSection');

  // remove any existing table
  while (resultSection.hasChildNodes()) {
    resultSection.removeChild(resultSection.lastChild);
  }

  // table, thead, tr, ht => title (href url), extract
  // table, body, tr, td
  const displayTbl = document.createElement('table');
  const tHead = document.createElement('thead');
  const headRow = document.createElement('tr');

  const titleHeader = document.createElement('th');
  titleHeader.textContent = 'Title';
  titleHeader.setAttribute('scope', 'col');

  const extractHeader = document.createElement('th');
  extractHeader.textContent = 'Document Extract';
  extractHeader.setAttribute('scope', 'col');

  headRow.appendChild(titleHeader);
  headRow.appendChild(extractHeader);
  tHead.appendChild(headRow);

  // generate entries
  const tBody = document.createElement('tbody');

  data[0].forEach((dataSet) => {
    // new row
    const contentRow = document.createElement('tr');
    const titleCell = document.createElement('td');
    const excerptCell = document.createElement('td');
    // linked title
    const titleEl = document.createElement('a');
    titleEl.setAttribute('href', dataSet[1]);
    titleEl.setAttribute('target', '_blank');
    titleEl.textContent = dataSet[0];
    titleCell.appendChild(titleEl);
    // document excerpt
    const docExcerpt = document.createElement('p');
    docExcerpt.textContent = dataSet[2];
    // add to the new row then to the body
    excerptCell.appendChild(docExcerpt);
    contentRow.appendChild(titleCell);
    contentRow.appendChild(excerptCell);
    tBody.appendChild(contentRow);
  });

  // attach header to table
  displayTbl.appendChild(tHead);
  // attach data/body to table
  displayTbl.appendChild(tBody);
  // attach table to resultSection element
  resultSection.appendChild(displayTbl);
}
