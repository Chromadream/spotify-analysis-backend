const axios = require("axios");
const ARTIST_URL = "https://api.spotify.com/v1/me/top/artists";
const TRACK_URL = "https://api.spotify.com/v1/me/top/tracks";

async function getTop(accessToken) {
  let topArtist = await getTopArtists(accessToken);
  let topTracks = await getTopTracks(accessToken);
  console.log(topArtist);
}

async function getTopArtists(accessToken) {
  let result = await makeRequests(ARTIST_URL, accessToken);
  artists = result.map(item => {
    return item.name;
  });
  return artists;
}

async function getTopTracks(accessToken) {
  let result = await makeRequests(TRACK_URL, accessToken);
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

function processData(result) {
  console.log(result);
}

module.exports = { getTop: getTop };
