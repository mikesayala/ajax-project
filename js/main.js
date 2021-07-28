var $form = document.querySelector('.form');
var $resultsContainer = document.querySelector('.results-container');
var $formContainer = document.querySelector('.form-container');
function genreSearch(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/genre/anime/' + value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', handleEverything);
  function handleEverything(event) {
    // console.log(xhr.status);
    // console.log(xhr.response.anime[0].image_url);
    for (var i = 0; i < xhr.response.length; i++) {
      // eslint-disable-next-line no-unused-vars
      var formObject = {
        title: xhr.response.anime[i].title,
        image: xhr.response.anime[i].image_url
      };
    }
    function genreDOMCreation(formObject) {
      var $genreObject = document.createElement('div');
      $genreObject.setAttribute('class', 'genre-object');

      var $rowResult = document.createElement('div');
      $rowResult.setAttribute('class', 'row justify-center results-row');

      var $imgUrl = document.createElement('img');
      $imgUrl.setAttribute('src', xhr.response.anime[i].image_url);
      $imgUrl.setAttribute('class', 'img-result');
      $rowResult.appendChild($imgUrl);

      var $divTitle = document.createElement('div');
      $divTitle.setAttribute('class', 'row justify-center');

      var $h3 = document.createElement('h3');
      $h3.setAttribute('class', 'title');
      $h3.textContent = xhr.response.anime[i].title;
      $divTitle.appendChild($h3);

      var $form = document.createElement('form');

      var $notGoodBtn = document.createElement('div');
      $notGoodBtn.setAttribute('class', 'row justify-center not-good-btn');
      $form.appendChild($notGoodBtn);

      var $label = document.createElement('label');
      $label.setAttribute('for', 'repeat');
      $label.setAttribute('class', 'not-good');
      $label.textContent = 'Is it... not good enough?';

      $notGoodBtn.appendChild($label);

      var $input = document.createElement('input');
      $input.setAttribute('type', 'submit');
      $input.setAttribute('id', 'repeat');
      $input.setAttribute('value', 'Cli-click me');
      $input.setAttribute('class', 'click-me');

      $notGoodBtn.appendChild($input);
      $rowResult.appendChild($form);
      $genreObject.appendChild($rowResult);
      $genreObject.appendChild($divTitle);
      $genreObject.appendChild($form);

      return $genreObject;
    }
    $resultsContainer.appendChild(genreDOMCreation($form.elements.select.value));
  }
  xhr.send();
}

function handleSearch(event) {
  event.preventDefault();
  genreSearch($form.elements.select.value);
  $formContainer.classList.add('hidden');
  $resultsContainer.classList.remove('hidden');
}

$form.addEventListener('submit', handleSearch);
