var $form = document.querySelector('.form');
var $resultsContainer = document.querySelector('.results-container');
var $formContainer = document.querySelector('.form-container');
var $homeBtn = document.querySelector('.aw-logo');
var $homeBtn2 = document.querySelector('.home');
var $score = document.getElementById('score');
function genreSearch(value, score) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/search/anime?q=&genre=' + value + '&score=' + score);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var randomAnime = shuffle(xhr.response.results);
    var resultAnime = randomAnime[0];
    $resultsContainer.appendChild(genreDOMCreation(resultAnime));
  });
  xhr.send();
}

function genreDOMCreation(resultAnime) {
  var $genreObject = document.createElement('div');
  $genreObject.setAttribute('class', 'genre-object');

  var $rowResult = document.createElement('div');
  $rowResult.setAttribute('class', 'row justify-center results-row');

  var $imgUrl = document.createElement('img');
  $imgUrl.setAttribute('src', resultAnime.image_url);
  $imgUrl.setAttribute('class', 'img-result');
  $rowResult.appendChild($imgUrl);

  var $divTitle = document.createElement('div');
  $divTitle.setAttribute('class', 'row justify-center');

  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'title');
  $h3.textContent = resultAnime.title;
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
  $input.setAttribute('class', 'click-me refresh');

  $notGoodBtn.appendChild($input);
  $rowResult.appendChild($form);
  $genreObject.appendChild($rowResult);
  $genreObject.appendChild($divTitle);
  $genreObject.appendChild($form);

  return $genreObject;
}

function shuffle(array) {
  for (var i = 0; i < array.length; i++) {
    var randomPosition = Math.floor(Math.random() * array.length);
    var placeHolder = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = placeHolder;
  }
  return array;
}

function handleSearch(event) {
  event.preventDefault();
  $resultsContainer.innerHTML = '';
  genreSearch($form.elements.select.value, $score.value);
  $formContainer.classList.add('hidden');
  $resultsContainer.classList.remove('hidden');
}

function handleRefresh(event) {
  event.preventDefault();
  $resultsContainer.innerHTML = '';
  genreSearch($form.elements.select.value, $score.value);

}

function home(event) {
  if (event.target.matches('.aw-logo') || event.target.matches('.home')) {
    $resultsContainer.classList.add('hidden');
    $formContainer.classList.remove('hidden');
  }
}

$form.addEventListener('submit', handleSearch);
$resultsContainer.addEventListener('submit', handleRefresh);
$homeBtn.addEventListener('click', home);
$homeBtn2.addEventListener('click', home);
