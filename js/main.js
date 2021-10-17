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
const $animeWatchersDesktop = document.querySelector('.anime-watchers-desktop');
const $animeWatchersMobile = document.querySelector('.anime-watchers-mobile');

let currentId = null;
const $noAnime = document.querySelector('.no-anime');
function genreSearch(value, score) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v3/search/anime?q=&genre=' + value + '&score=' + score);
  xhr.responseType = 'json';
  $heart.className = 'lds-heart row justify-center';
  $resultsContainer.classList.add('hiding');
  xhr.addEventListener('load', () => {
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
  xhr.addEventListener('load', () => {
    const fullAnime = {
      title: xhr.response.title,
      image: xhr.response.image_url,
      synopsis: xhr.response.synopsis
    };
    $resultsContainer.appendChild(genreDOMCreation(fullAnime));
  });
  xhr.send();
}

function genreDOMCreation(fullAnime) {
  const $genreObject = document.createElement('div');
  $genreObject.setAttribute('class', 'genre-object');

  const $rowResult = document.createElement('div');
  $rowResult.setAttribute('class', 'row justify-center flex-wrap results-row');

  const $imgUrl = document.createElement('img');
  $imgUrl.setAttribute('src', fullAnime.image);
  $imgUrl.setAttribute('class', 'img-result');
  $rowResult.appendChild($imgUrl);

  const $synopsisContainer = document.createElement('div');

  const $desktopTitle = document.createElement('h3');
  $desktopTitle.setAttribute('class', 'title desktop-title');
  $desktopTitle.textContent = fullAnime.title;
  $synopsisContainer.appendChild($desktopTitle);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'synopsis');
  $p.textContent = fullAnime.synopsis;
  $synopsisContainer.appendChild($p);

  $rowResult.appendChild($synopsisContainer);

  const $divTitle = document.createElement('div');
  $divTitle.setAttribute('class', 'row justify-center margin-top');

  const $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'title mobile-title');
  $h3.textContent = fullAnime.title;
  $divTitle.appendChild($h3);

  const $buttonRow = document.createElement('div');
  $buttonRow.setAttribute('class', 'row form');

  var $saveBtnDiv = document.createElement('div');
  $saveBtnDiv.setAttribute('class', 'row justify-center not-good-btn save');
  $buttonRow.appendChild($saveBtnDiv);

  const $saveLabel = document.createElement('label');
  $saveLabel.setAttribute('for', 'save');
  $saveLabel.setAttribute('class', 'not-good');
  $saveLabel.textContent = 'Binge Worthy?';

  const $saveBtn = document.createElement('button');
  $saveBtn.setAttribute('id', 'save');
  $saveBtn.setAttribute('data-value', JSON.stringify(fullAnime));
  $saveBtn.setAttribute('class', 'click-me refresh save-me button');
  $saveBtn.setAttribute('value', 'Sa...Save me');
  $saveBtn.textContent = 'Save me';
  $saveBtnDiv.appendChild($saveLabel);
  $saveBtnDiv.appendChild($saveBtn);
  $saveBtn.addEventListener('click', createAnimeList);

  const $notGoodBtn = document.createElement('div');
  $notGoodBtn.setAttribute('class', 'row justify-center not-good-btn');
  $buttonRow.appendChild($notGoodBtn);

  const $label = document.createElement('label');
  $label.setAttribute('for', 'repeat');
  $label.setAttribute('class', 'not-good');
  $label.textContent = 'Is it... not good enough?';

  $notGoodBtn.appendChild($label);

  const $input = document.createElement('button');
  $input.setAttribute('id', 'repeat');
  $input.setAttribute('value', 'Cli-click me');
  $input.setAttribute('class', 'click-me refresh pointer button random');
  $input.textContent = 'Click me';

  $notGoodBtn.appendChild($input);
  $rowResult.appendChild($buttonRow);
  $genreObject.appendChild($rowResult);
  $genreObject.appendChild($divTitle);
  $genreObject.appendChild($buttonRow);

  return $genreObject;
}

function createAnimeList(event) {
  const fullAnime = JSON.parse(event.target.getAttribute('data-value'));
  if (event.target.parentElement.matches('.save')) {
    const animeObject = {
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
  const $listColumn = document.createElement('div');
  $listColumn.setAttribute('class', 'column list-column data-id');
  $listColumn.setAttribute('data-anime-id', animeObject.id);

  var $imageTrashDiv = document.createElement('div');
  $imageTrashDiv.setAttribute('class', 'row justify-center');
  $listColumn.appendChild($imageTrashDiv);

  const $listImg = document.createElement('img');
  $listImg.setAttribute('src', animeObject.image);
  $listImg.setAttribute('class', 'list-img');
  $imageTrashDiv.appendChild($listImg);

  const $trash = document.createElement('img');
  $trash.setAttribute('src', 'images/Trash.ico');
  $trash.setAttribute('class', 'trash pointer');
  $trash.setAttribute('alt', 'trashcan');
  $imageTrashDiv.appendChild($trash);

  const $listH4 = document.createElement('h4');
  $listH4.setAttribute('class', 'h4');
  $listH4.textContent = animeObject.title;
  $listColumn.appendChild($listH4);

  return $listColumn;
}

function submitAnime(event) {
  for (let i = 0; i < data.anime.length; i++) {
    $listRow.append(watchListCreation(data.anime[i]));
  }
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const randomPosition = Math.floor(Math.random() * array.length);
    const placeHolder = array[i];
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
    $resultsContainer.classList.toggle('hidden');
    $listContainer.classList.toggle('hidden');
    submitAnime(data.anime[0]);
  } else if (event.target.matches('.random')) {
    $resultsContainer.innerHTML = '';
    genreSearch($form.elements.select.value, $score.value);
  }
}

function home(event) {
  if (event.target.matches('.aw-logo') || event.target.matches('.home') || event.target.matches('.anime-watchers-desktop') || event.target.matches('.anime-watchers-mobile')) {
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
const $no = document.querySelector('.no');
const $yes = document.querySelector('.yes');
const $deleteEntry = document.querySelector('.delete-entry');
function deleteModal(event) {
  if (event.target.matches('.trash')) {
    $deleteEntry.classList.remove('hidden');
    $WatchListContainer.classList.remove('opacity');
    const dataId = event.target.closest('div.data-id');
    const closestDataId = dataId;
    currentId = closestDataId.getAttribute('data-anime-id');
  }
}

function handleNo(event) {
  $deleteEntry.classList.toggle('hidden');
  $WatchListContainer.classList.add('opacity');
}

function handleYes(event) {
  const $dataIdList = document.querySelectorAll('.data-id');
  if ($dataIdList.length === 0) {
    return;
  }
  for (let nextAnimeId = 0; nextAnimeId < data.anime.length; nextAnimeId++) {
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
$animeWatchersDesktop.addEventListener('click', home);
$animeWatchersMobile.addEventListener('click', home);
$homeBtn.addEventListener('click', home);
$homeBtn2.addEventListener('click', home);
document.addEventListener('DOMContentLoaded', onLoad);
