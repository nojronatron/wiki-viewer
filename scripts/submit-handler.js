'use strict';

// get a ref to the form
let form = document.querySelector('#docSearchForm');

// register an event handler to manage form data submission
form.addEventListener('submit', submitHandler, false);

async function submitHandler(event) {
  event.preventDefault();
  const userInput = event.target.queryInput.value;
  // let fetchResult = await sendData(userInput);
  // let resultArr = fetchResult.query;
  // displayResult(resultArr);
}

async function displayResult(data) {
  console.log('displayResult() param is: ', data);

  if (Array.isArray(data.search) && data.search.length > 0) {
    console.log('data.search is an array!');

    let resultSection = document.getElementById('resultSection');

    // set up the results table
    let tbl = document.createElement('table'); // table
    let tblBody = document.createElement('tbody'); // table body parent element
    let tHead = document.createElement('thead'); // table head parent element
    let tHeadRow = document.createElement('tr'); // table head row element

    // table header title cell
    let tHeadTitleCell = document.createElement('th'); // thead Title
    tHeadTitleCell.textContent = 'Title';
    tHeadTitleCell.setAttribute('scope', 'col');
    tHeadRow.appendChild(tHeadTitleCell);

    // table header word count cell
    let tHeadWordCountCell = document.createElement('th'); // thead Word Count
    tHeadWordCountCell.textContent = 'Words';
    tHeadWordCountCell.setAttribute('scope', 'col');
    tHeadRow.appendChild(tHeadWordCountCell);

    // table header html snippet cell
    let tHeadSnippetCell = document.createElement('th'); // thead Snippet
    tHeadSnippetCell.textContent = 'Article Snippet';
    tHeadSnippetCell.setAttribute('scope', 'col');
    tHeadRow.appendChild(tHeadSnippetCell);

    // attach header row to header parent
    tHead.appendChild(tHeadRow);

    data.search.forEach((item) => {
      // new data, new row!
      let tableRow = document.createElement('tr');

      // setup title, wordcount, snippet cell text data
      let titleCell = document.createElement('td');
      titleCell.textContent = item.title;
      titleCell.setAttribute('class', 'centeredCellText');
      tableRow.appendChild(titleCell);

      let wordCountCell = document.createElement('td');
      wordCountCell.textContent = item.wordcount;
      wordCountCell.setAttribute('class', 'centeredSmallCellText');
      tableRow.appendChild(wordCountCell);

      let snippetCell = document.createElement('td');
      let codeSnippet = document.createElement('code');

      // make the code snippet safe
      const safeSnippetText = removeElements(item.snippet);
      codeSnippet.textContent = safeSnippetText;

      codeSnippet.setAttribute('class', 'snippetText');
      snippetCell.appendChild(codeSnippet);
      tableRow.appendChild(snippetCell);

      // attach new row to the table body
      tblBody.appendChild(tableRow);
    });

    // attach everything to the table
    tbl.appendChild(tHead);
    tbl.appendChild(tblBody);

    // attach table to the resultSection
    resultSection.appendChild(tbl);
  }
}

// use Fetch to send query to wikipedia api and return results
// async function sendData(queryTerm) {
//   // todo: consider processing queryTerm as UrlEncoded to support space, puctuation
//   console.log('sendData() received queryTerm: ', queryTerm);
//   let fetchUrl =
//     'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
//     queryTerm +
//     '&format=json&origin=*';
//   console.log(`concatenated url: ${fetchUrl}`);

//   let headersList = {
//     Accept: '*/*',
//     'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
//   };

//   let response = await fetch(fetchUrl, {
//     method: 'GET',
//     headers: headersList,
//   });

//   let data = await response.json();
//   return data;
// }
