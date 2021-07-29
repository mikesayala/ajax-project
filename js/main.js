var $form = document.querySelector('.form');
var $resultsContainer = document.querySelector('.results-container');
var $formContainer = document.querySelector('.form-container');
var $homeBtn = document.querySelector('.aw-logo');
function genreSearch(value) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/genre/anime/' + value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var animeData = xhr.response.anime;
    var randomAnime = shuffle(animeData);
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
  genreSearch($form.elements.select.value);
  $formContainer.classList.add('hidden');
  $resultsContainer.classList.remove('hidden');
}

function handleRefresh(event) {
  event.preventDefault();
  if (event.target.classList.contains('click-me refresh')) {
    alert(event.target.innerHTML);
  }
  $resultsContainer.innerHTML = '';
  genreSearch($form.elements.select.value);
}

function home(event) {
  if (event.target.matches('.aw-logo')) {
    $resultsContainer.classList.add('hidden');
    $formContainer.classList.remove('hidden');
  }
}

$form.addEventListener('submit', handleSearch);
$resultsContainer.addEventListener('submit', handleRefresh);
$homeBtn.addEventListener('click', home);
