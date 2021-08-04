/* exported data */
var data = {
  anime: [],
  nextAnimeId: 1
};

window.addEventListener('beforeunload', handleAnime);

function handleAnime(event) {
  var resultJSON = JSON.stringify(data);
  localStorage.setItem('animes', resultJSON);
}

var previousResultJSON = localStorage.getItem('animes');
if (previousResultJSON !== null) {
  data = JSON.parse(previousResultJSON);
}
