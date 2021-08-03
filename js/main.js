var $form = document.querySelector('.form');
var $resultsContainer = document.querySelector('.results-container');
var $formContainer = document.querySelector('.form-container');
var $homeBtn = document.querySelector('.aw-logo');
var $homeBtn2 = document.querySelector('.home');
var $score = document.getElementById('score');
// var $listRow = document.querySelector('.list-row');
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

  var $form = document.createElement('form');
  $form.setAttribute('class', 'row');

  var $saveBtnDiv = document.createElement('div');
  $saveBtnDiv.setAttribute('class', 'row justify-center not-good-btn');
  $form.appendChild($saveBtnDiv);

  var $saveLabel = document.createElement('label');
  $saveLabel.setAttribute('for', 'save');
  $saveLabel.setAttribute('class', 'not-good');
  $saveLabel.textContent = 'Binge Worthy?';

  var $saveBtn = document.createElement('input');
  $saveBtn.setAttribute('type', 'submit');
  $saveBtn.setAttribute('id', 'save');
  $saveBtn.setAttribute('class', 'click-me refresh');
  $saveBtn.setAttribute('value', 'Sa...Save me');
  $saveBtnDiv.appendChild($saveLabel);
  $saveBtnDiv.appendChild($saveBtn);

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

// function generateList(listObject) {
//   var $listColumn = document.createElement('div');
//   $listColumn.setAttribute('class', 'column list-column');

//   var $listImg = document.createElement('img');
//   $listImg.setAttribute('src', listObject.img_url);
//   $listImg.setAttribute('class', 'list-img');
//   $listColumn.appendChild($listImg);

//   var $listH4 = document.createElement('h4');
//   $listH4.setAttribute('class', 'h4');
//   $listH4.textContent = listObject.title;
// }

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

// function handleSave(event) {
//   console.log('hi');
// }

function home(event) {
  if (event.target.matches('.aw-logo') || event.target.matches('.home')) {
    $resultsContainer.classList.add('hidden');
    $formContainer.classList.remove('hidden');
  }
}

// $resultsContainer.addEventListener('click', handleSave);
$form.addEventListener('submit', handleSearch);
$resultsContainer.addEventListener('submit', handleRefresh);
$homeBtn.addEventListener('click', home);
$homeBtn2.addEventListener('click', home);
