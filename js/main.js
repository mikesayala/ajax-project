/* global data */
/* exported data */

const $form = document.querySelector('.form');
const $resultsContainer = document.querySelector('.results-container');
const $formContainer = document.querySelector('.form-container');
const $listContainer = document.querySelector('.list-container');
const $homeBtn = document.querySelector('.aw-logo');
const $homeBtn2 = document.querySelector('.home');
const $score = document.getElementById('score');
const $listRow = document.querySelector('.list-row');
const $watchListDesk = document.querySelector('.watch-list-desktop');
const $watchListMobile = document.querySelector('.watch-list-mobile');
const $WatchListContainer = document.querySelector('.watch-list-container');
const $heart = document.querySelector('.lds-heart');
const $noEntries = document.querySelector('.empty-results');
const $lost = document.querySelector('.lost');

let currentId = null;
const $noAnime = document.querySelector('.no-anime');
function genreSearch(value, score) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/search/anime?q=&genre=' + value + '&score=' + score);
  xhr.responseType = 'json';
  $heart.className = 'lds-heart row justify-center';
  $resultsContainer.classList.add('hiding');
  xhr.addEventListener('load', function () {
    if (xhr.status === 404) {
      $noEntries.classList.toggle('hidden');
      $heart.className = 'hidden';
      $resultsContainer.classList.toggle('hidden');
    }
    const randomAnime = shuffle(xhr.response.results);
    const resultAnime = randomAnime[0];
    synopsis(resultAnime.mal_id);
    $heart.className = 'hidden';
    $resultsContainer.classList.remove('hiding');
  });
  xhr.addEventListener('error', () => {
    $lost.classList.toggle('hidden');
    $heart.className = 'hidden';
    $resultsContainer.classList.toggle('hidden');
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

  var $saveBtn = document.createElement('button');
  $saveBtn.setAttribute('id', 'save');
  $saveBtn.setAttribute('data-value', JSON.stringify(fullAnime));
  $saveBtn.setAttribute('class', 'click-me refresh save-me button');
  $saveBtn.setAttribute('value', 'Sa...Save me');
  $saveBtn.textContent = 'Sa...Save me';
  $saveBtnDiv.appendChild($saveLabel);
  $saveBtnDiv.appendChild($saveBtn);
  $saveBtn.addEventListener('click', createAnimeList);

  var $notGoodBtn = document.createElement('div');
  $notGoodBtn.setAttribute('class', 'row justify-center not-good-btn');
  $buttonRow.appendChild($notGoodBtn);

  var $label = document.createElement('label');
  $label.setAttribute('for', 'repeat');
  $label.setAttribute('class', 'not-good');
  $label.textContent = 'Is it... not good enough?';

  $notGoodBtn.appendChild($label);

  var $input = document.createElement('button');
  $input.setAttribute('id', 'repeat');
  $input.setAttribute('value', 'Cli-click me');
  $input.setAttribute('class', 'click-me refresh pointer button random');
  $input.textContent = 'Cli-click me';

  $notGoodBtn.appendChild($input);
  $rowResult.appendChild($buttonRow);
  $genreObject.appendChild($rowResult);
  $genreObject.appendChild($divTitle);
  $genreObject.appendChild($buttonRow);

  return $genreObject;
}

function createAnimeList(event) {
  var fullAnime = JSON.parse(event.target.getAttribute('data-value'));
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
  }
}

function watchListCreation(animeObject) {
  var $listColumn = document.createElement('div');
  $listColumn.setAttribute('class', 'column list-column data-id');
  $listColumn.setAttribute('data-anime-id', animeObject.id);

  var $imageTrashDiv = document.createElement('div');
  $imageTrashDiv.setAttribute('class', 'row justify-center');
  $listColumn.appendChild($imageTrashDiv);

  var $listImg = document.createElement('img');
  $listImg.setAttribute('src', animeObject.image);
  $listImg.setAttribute('class', 'list-img');
  $imageTrashDiv.appendChild($listImg);

  var $trash = document.createElement('img');
  $trash.setAttribute('src', 'images/Trash.ico');
  $trash.setAttribute('class', 'trash pointer');
  $trash.setAttribute('alt', 'trashcan');
  $imageTrashDiv.appendChild($trash);

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
    $noAnime.classList.add('hidden');
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
    $noEntries.classList.add('hidden');
  }
}

function watchListToggle(event) {
  if (event.target.matches('.watch-list-desktop') || event.target.matches('.watch-list-mobile')) {
    $formContainer.classList.add('hidden');
    $resultsContainer.classList.add('hidden');
    $listContainer.classList.remove('hidden');
  }
  if (data.anime.length === 0) {
    $noAnime.classList.remove('hidden');
  }
}
var $no = document.querySelector('.no');
var $yes = document.querySelector('.yes');
var $deleteEntry = document.querySelector('.delete-entry');
function deleteModal(event) {
  // console.log('event.target', event.target);
  if (event.target.matches('.trash')) {
    $deleteEntry.classList.remove('hidden');
    $WatchListContainer.classList.remove('opacity');
    var dataId = event.target.closest('div.data-id');
    var closestDataId = dataId;
    currentId = closestDataId.getAttribute('data-anime-id');
  }
}

function handleNo(event) {
  $deleteEntry.classList.toggle('hidden');
  $WatchListContainer.classList.add('opacity');
}

function handleYes(event) {
  var $dataIdList = document.querySelectorAll('.data-id');
  if ($dataIdList.length === 0) {
    return;
  }
  for (var nextAnimeId = 0; nextAnimeId < data.anime.length; nextAnimeId++) {
    if (data.anime[nextAnimeId].id === parseInt(currentId)) {
      data.anime.splice(nextAnimeId, 1);
    }
  }
  $listRow.innerHTML = '';
  submitAnime();
  if (data.anime.length === 0) {
    $noAnime.classList.remove('hidden');
  }
  $deleteEntry.classList.toggle('hidden');
  $WatchListContainer.classList.remove('hidden');
  $WatchListContainer.classList.add('opacity');
}

function onLoad(event) {
  submitAnime();
}

$yes.addEventListener('click', handleYes);
$no.addEventListener('click', handleNo);
$WatchListContainer.addEventListener('click', deleteModal);
$watchListMobile.addEventListener('click', watchListToggle);
$watchListDesk.addEventListener('click', watchListToggle);
$form.addEventListener('submit', handleSearch);
$resultsContainer.addEventListener('click', handleRefresh);
$homeBtn.addEventListener('click', home);
$homeBtn2.addEventListener('click', home);
document.addEventListener('DOMContentLoaded', onLoad);
