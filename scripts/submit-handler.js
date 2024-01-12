'use strict';

// get a ref to the form
let form = document.querySelector('#docSearchForm');

// register an event handler to manage form data submission
form.addEventListener('submit', submitHandler, false);

function submitHandler(event) {
  event.preventDefault();
  const userInput = event.target.queryInput.value;
  sendData(userInput);
}

// use Fetch to send query to wikipedia api and return results
async function sendData(formData) {
  console.log('sendData() received formData: ', formData);
  let queryTerm = formData;
  let url = `http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${queryTerm}&format=json`;

  fetch(url, {
    headers: {
      'User-Agent': 'Exploring/1.0 (https://github.com/nojronatron)',
    },
    method: 'GET',
    mode: 'no-cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error in response: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      // displayResults(json) method to be created
      console.log(`display response json: ${json}`);
    })
    .catch((error) => {
      console.error(error);
    });
}
