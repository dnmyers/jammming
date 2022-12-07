let accessToken = '';
const client_id = 'f1b58fbb435f44a28aa866b0aaf93a88';
const redirect_uri = 'http://localhost:3000/';
// const redirect_uri = 'http://dnm-jammming.surge.sh';

// Client ID: f1b58fbb435f44a28aa866b0aaf93a88
// Client Secret: 467b34493b8a47bba6cd9a3f3276af18

const Spotify = {
    // GET ACCESS TOKEN
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Check for access_token match and expires_in match in URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear the parameters and grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },

    // SEARCH FOR TRACK
    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    // SAVE PLAYLIST
    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        let userID;

        // GET USERID
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;

            // CREATE A NEW PLAYLIST AND GET PLAYLIST ID
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistID = jsonResponse.id;

                    // ADD TRACKS TO PLAYLIST
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                        {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        }).then(response => response.json())
                });
        });
    }
};

export default Spotify;