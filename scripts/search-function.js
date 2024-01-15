'use strict';

// get a ref to the form
let form = document.querySelector('#docSearchForm');
// get a ref to the random article button
let randButton = document.querySelector('#clickRandomArticle');

// register an event handlers
form.addEventListener('submit', formSubmitHandler, false);
randButton.addEventListener('click', clickRandomArticleHandler, false);

async function formSubmitHandler(event) {
  event.preventDefault();
  const userInput = event.target.queryInput.value;
  const openSearchJson = await getOpenSearchTitles(userInput);
  if (openSearchJson.length < 1) {
    // todo: notify user something went wrong
    return;
  }

  // acquire single sentence extracts from each document
  // using each Title as the search term
  // Promise.all section is c/o github copilot...
  const extractSentencesPromises = openSearchJson[0].map((titleUrl) => {
    return getQueryExtractSentence(titleUrl);
  });

  const extractSentences = await Promise.all(extractSentencesPromises);

  // paste-together arrays like: [ [title1, title2, ...], [url1, url2, ...], [extract1, extract2, ...]]
  const conjugatedResults = [
    [...openSearchJson[0]],
    [...openSearchJson[1]],
    [...extractSentences],
  ];

  // conjugateResult is: array of [titles], [urls], [sentence extracts]
  displayResult(conjugatedResults);
}

async function clickRandomArticleHandler(event) {
  getRandomReferences();
}

async function displayResult(data) {
  if (data === null || Array.isArray(data) !== true) {
    return;
  }

  // unpack the 2-d array to simplify usage
  const titlesArr = [...data[0]];
  const linksArr = [...data[1]];
  const extractsArr = [...data[2]];

  // acquire ref to Section element where result table will be built
  const resultSection = document.getElementById('resultSection');

  // remove any existing table
  while (resultSection.hasChildNodes()) {
    resultSection.removeChild(resultSection.lastChild);
  }

  // table, thead, tr, ht => title (href url), extract table, body, tr, td
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

  // generate table body, cells
  const tBody = document.createElement('tbody');

  // gather Titles
  for (let idx = 0; idx < titlesArr.length; idx++) {
    const currentTitle = titlesArr[idx];
    const currentUrl = linksArr[idx];
    const currentExtract = removeHtmlElements(extractsArr[idx]);

    // new row
    const contentRow = document.createElement('tr');
    const titleCell = document.createElement('td');
    const excerptCell = document.createElement('td');

    // linked title
    const titleEl = document.createElement('a');
    titleEl.setAttribute('href', currentUrl);
    titleEl.setAttribute('target', '_blank');
    titleEl.textContent = currentTitle;
    titleCell.appendChild(titleEl);

    // document excerpt
    const docExcerpt = document.createElement('p');
    docExcerpt.textContent = currentExtract;

    // add to the new row then to the body
    excerptCell.appendChild(docExcerpt);
    contentRow.appendChild(titleCell);
    contentRow.appendChild(excerptCell);
    tBody.appendChild(contentRow);
  }

  // attach header to table
  displayTbl.appendChild(tHead);
  // attach data/body to table
  displayTbl.appendChild(tBody);
  // attach table to resultSection element
  resultSection.appendChild(displayTbl);
}
