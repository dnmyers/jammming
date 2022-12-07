"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var accessToken = '';
var client_id = 'f1b58fbb435f44a28aa866b0aaf93a88';
var redirect_uri = 'http://localhost:3000/'; // const redirect_uri = 'http://dnm-jammming.surge.sh';
// Client ID: f1b58fbb435f44a28aa866b0aaf93a88
// Client Secret: 467b34493b8a47bba6cd9a3f3276af18

var Spotify = {
  // GET ACCESS TOKEN
  getAccessToken: function getAccessToken() {
    if (accessToken) {
      return accessToken;
    } // Check for access_token match and expires_in match in URL


    var accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    var expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      var expiresIn = Number(expiresInMatch[1]); // Clear the parameters and grab a new access token when it expires

      window.setTimeout(function () {
        return accessToken = '';
      }, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      var accessUrl = "https://accounts.spotify.com/authorize?client_id=".concat(client_id, "&response_type=token&scope=playlist-modify-public&redirect_uri=").concat(redirect_uri);
      window.location = accessUrl;
    }
  },
  // SEARCH FOR TRACK
  search: function search(term) {
    var accessToken = Spotify.getAccessToken();
    return fetch("https://api.spotify.com/v1/search?type=track&q=".concat(term), {
      headers: {
        Authorization: "Bearer ".concat(accessToken)
      }
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(function (track) {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
    });
  },
  // SAVE PLAYLIST
  savePlaylist: function savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return;
    }

    var accessToken = Spotify.getAccessToken();
    var headers = {
      Authorization: "Bearer ".concat(accessToken)
    };
    var userID; // GET USERID

    return fetch("https://api.spotify.com/v1/me", {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      userID = jsonResponse.id; // CREATE A NEW PLAYLIST AND GET PLAYLIST ID

      return fetch("https://api.spotify.com/v1/users/".concat(userID, "/playlists"), {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: name
        })
      }).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        var playlistID = jsonResponse.id; // ADD TRACKS TO PLAYLIST

        return fetch("https://api.spotify.com/v1/users/".concat(userID, "/playlists/").concat(playlistID, "/tracks"), {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            uris: trackURIs
          })
        }).then(function (response) {
          return response.json();
        });
      });
    });
  }
};
var _default = Spotify;
exports["default"] = _default;
//# sourceMappingURL=Spotify.dev.js.map
