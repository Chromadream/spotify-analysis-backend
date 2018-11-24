const axios = require("axios");
const ARTIST_URL = "https://api.spotify.com/v1/me/top/artists";
const TRACK_URL = "https://api.spotify.com/v1/me/top/tracks";

async function getTop(accessToken) {
  let { artists: topArtist, genre: topGenre } = await getTopArtists(
    accessToken
  );
  let topTracks = await getTopTracks(accessToken);
  console.log(topArtist);
  console.log(topGenre);
  console.log(topTracks);
}

async function getTopArtists(accessToken) {
  let result = await makeRequests(ARTIST_URL, accessToken);
  var genre = {};
  result.forEach(item => {
    let currentEntry = item.genres;
    for (let i = 0; i < currentEntry.length; i++) {
      if (genre.hasOwnProperty(currentEntry[i])) {
        genre[currentEntry[i]]++;
      } else {
        genre[currentEntry[i]] = 1;
      }
    }
  });
  artists = result.map(item => {
    return item.name;
  });
  return { artists, genre };
}

async function getTopTracks(accessToken) {
  let result = await makeRequests(TRACK_URL, accessToken);
  result = result.map(item => {
    return {
      title: item.name,
      album: item.album.name,
      artist: item.artists[0].name
    };
  });
  return result;
}

async function makeRequests(url, accessToken) {
  let data = axios
    .get(url, {
      headers: { Authorization: "Bearer " + accessToken },
      params: {
        limit: 10,
        time_range: "long_term"
      }
    })
    .then(response => {
      return response.data.items;
    })
    .catch(error => {
      console.log(error);
    });
  return data;
}

module.exports = { getTop: getTop };
