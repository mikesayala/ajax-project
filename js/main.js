/* global data */
/* exported data */

var $form = document.querySelector('.form');
var $resultsContainer = document.querySelector('.results-container');
var $formContainer = document.querySelector('.form-container');
var $listContainer = document.querySelector('.list-container');
var $homeBtn = document.querySelector('.aw-logo');
var $homeBtn2 = document.querySelector('.home');
var $score = document.getElementById('score');
var $listRow = document.querySelector('.list-row');
var $watchListDesk = document.querySelector('.watch-list-desktop');
var $watchListMobile = document.querySelector('.watch-list-mobile');
function genreSearch(value, score) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/search/anime?q=&genre=' + value + '&score=' + score);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var randomAnime = shuffle(xhr.response.results);
    var resultAnime = randomAnime[0];
    synopsis(resultAnime.mal_id);
  });
  xhr.send();
}

function synopsis(malId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/anime/' + malId);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var fullAnime = {
      title: xhr.response.title,
      image: xhr.response.image_url,
      synopsis: xhr.response.synopsis
    };
    $resultsContainer.appendChild(genreDOMCreation(fullAnime));
    $resultsContainer.addEventListener('click', function () { createAnimeList(fullAnime); });
  });
  xhr.send();
}

function genreDOMCreation(fullAnime) {
  var $genreObject = document.createElement('div');
  $genreObject.setAttribute('class', 'genre-object');

  var $rowResult = document.createElement('div');
  $rowResult.setAttribute('class', 'row justify-center flex-wrap results-row');

  var $imgUrl = document.createElement('img');
  $imgUrl.setAttribute('src', fullAnime.image);
  $imgUrl.setAttribute('class', 'img-result');
  $rowResult.appendChild($imgUrl);

  var $synopsisContainer = document.createElement('div');

  var $desktopTitle = document.createElement('h3');
  $desktopTitle.setAttribute('class', 'title desktop-title');
  $desktopTitle.textContent = fullAnime.title;
  $synopsisContainer.appendChild($desktopTitle);

  var $p = document.createElement('p');
  $p.setAttribute('class', 'synopsis');
  $p.textContent = fullAnime.synopsis;
  $synopsisContainer.appendChild($p);

  $rowResult.appendChild($synopsisContainer);

  var $divTitle = document.createElement('div');
  $divTitle.setAttribute('class', 'row justify-center margin-top');

  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'title mobile-title');
  $h3.textContent = fullAnime.title;
  $divTitle.appendChild($h3);

  var $buttonRow = document.createElement('div');
  $buttonRow.setAttribute('class', 'row form');

  var $saveBtnDiv = document.createElement('div');
  $saveBtnDiv.setAttribute('class', 'row justify-center not-good-btn save');
  $buttonRow.appendChild($saveBtnDiv);

  var $saveLabel = document.createElement('label');
  $saveLabel.setAttribute('for', 'save');
  $saveLabel.setAttribute('class', 'not-good');
  $saveLabel.textContent = 'Binge Worthy?';

  var $saveBtn = document.createElement('input');
  $saveBtn.setAttribute('type', 'submit');
  $saveBtn.setAttribute('id', 'save');
  $saveBtn.setAttribute('class', 'click-me refresh save-me');
  $saveBtn.setAttribute('value', 'Sa...Save me');
  $saveBtnDiv.appendChild($saveLabel);
  $saveBtnDiv.appendChild($saveBtn);

  var $notGoodBtn = document.createElement('div');
  $notGoodBtn.setAttribute('class', 'row justify-center not-good-btn');
  $buttonRow.appendChild($notGoodBtn);

  var $label = document.createElement('label');
  $label.setAttribute('for', 'repeat');
  $label.setAttribute('class', 'not-good');
  $label.textContent = 'Is it... not good enough?';

  $notGoodBtn.appendChild($label);

  var $input = document.createElement('input');
  $input.setAttribute('type', 'submit');
  $input.setAttribute('id', 'repeat');
  $input.setAttribute('value', 'Cli-click me');
  $input.setAttribute('class', 'click-me refresh random');

  $notGoodBtn.appendChild($input);
  $rowResult.appendChild($buttonRow);
  $genreObject.appendChild($rowResult);
  $genreObject.appendChild($divTitle);
  $genreObject.appendChild($buttonRow);

  return $genreObject;
}

function createAnimeList(fullAnime) {
  if (event.target.parentElement.matches('.save')) {
    var animeObject = {
      title: fullAnime.title,
      image: fullAnime.image,
      synopsis: fullAnime.synopsis,
      id: data.nextAnimeId
    };
    data.nextAnimeId++;
    data.anime.unshift(animeObject);
    $listRow.innerHTML = '';
    submitAnime();
  }
}

function watchListCreation(animeObject) {
  var $listColumn = document.createElement('div');
  $listColumn.setAttribute('class', 'column list-column');
  var $listImg = document.createElement('img');
  $listImg.setAttribute('src', animeObject.image);
  $listImg.setAttribute('class', 'list-img');
  $listColumn.appendChild($listImg);

  var $listH4 = document.createElement('h4');
  $listH4.setAttribute('class', 'h4');
  $listH4.textContent = animeObject.title;
  $listColumn.appendChild($listH4);

  return $listColumn;
}

function submitAnime(event) {
  for (var i = 0; i < data.anime.length; i++) {
    $listRow.append(watchListCreation(data.anime[i]));
  }
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
  if (event.target.matches('.save-me')) {
    submitAnime(data.anime[0]);
  } else if (event.target.matches('.random')) {
    $resultsContainer.innerHTML = '';
    genreSearch($form.elements.select.value, $score.value);
  }
}

function home(event) {
  if (event.target.matches('.aw-logo') || event.target.matches('.home')) {
    $resultsContainer.classList.add('hidden');
    $listContainer.classList.add('hidden');
    $formContainer.classList.remove('hidden');
  }
}

function watchListToggle(event) {
  if (event.target.matches('.watch-list-desktop') || event.target.matches('.watch-list-mobile')) {
    $formContainer.classList.add('hidden');
    $resultsContainer.classList.add('hidden');
    $listContainer.classList.remove('hidden');
  }
}

$watchListMobile.addEventListener('click', watchListToggle);
$watchListDesk.addEventListener('click', watchListToggle);
$form.addEventListener('submit', handleSearch);
$resultsContainer.addEventListener('click', handleRefresh);
$homeBtn.addEventListener('click', home);
$homeBtn2.addEventListener('click', home);
document.addEventListener('DOMContentLoaded', submitAnime);
