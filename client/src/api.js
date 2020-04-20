const url = process.env.REACT_APP_API_URL;

function search(title) {
  return fetch(`${url}/search/${encodeURIComponent(title)}`)
  .then(res => res.json())
  .then(data => data);
}

function show(tconst) {
  return fetch(`${url}/show/${tconst}`)
  .then(res => res.json())
  .then(data => data[0]);
}

function poster(tconst) {
  var url = `${process.env.REACT_APP_OMDB_URL}/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${tconst}`;
  return fetch(url)
  .then(res => res.json())
  .then(data => {
    let img = data.Poster;
    //placeholder for empty/null results
    return (img && img !== "N/A") ? img : 'https://via.placeholder.com/300x450';
  });
}

function episodes(tconst) {
  return fetch(`${url}/seasons/${tconst}`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of Objs unsorted. Loop through items and group into ordered Obj for each season
    let sorted = response.reduce((r, a) => {
      r[a.seasonNumber] = r[a.seasonNumber] || [];
      r[a.seasonNumber].push(a);
      //sort season obj by episode
      r[a.seasonNumber].sort((a,b) => (a.episodeNumber > b.episodeNumber) ? 1 : ((b.episodeNumber > a.episodeNumber) ? -1 : 0));
      return r;
    }, Object.create(null));
    //return both for use in BestWorst and Seasons
    return {
      allEpisodes: response,
      seasons: sorted
    };
  });
}

export default {search, show, poster, episodes}