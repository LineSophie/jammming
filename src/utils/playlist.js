/*
  The module consists of two functions related to Spotify integration.
    1) search(term):
      This function performs a search for tracks on Spotify based on a given search term.
      It calls the getAccessToken() function from the ./authorization module to retrieve the access token.
      Using the obtained access token, it makes a request to the Spotify API to search for tracks matching the provided term.
      The function parses the JSON response and extracts relevant track information such as ID, name, artist, album, image source, and URI.
      It returns an array of track objects based on the search results.

    2) savePlaylist(playlistName, tracksUri):
      This function saves a playlist to the user's Spotify account.
      It also utilizes the getAccessToken() function to obtain the access token.
      The function first fetches the user's ID from the Spotify API using the access token.
      It then creates a new playlist by making a POST request to the Spotify API with the provided playlist name.
      After successfully creating the playlist, it adds the tracks specified by their URIs to the playlist.
      The function logs a message indicating that the songs have been added to the playlist.

  Both functions handle potential errors and log relevant messages when necessary.
*/

import { getAccessToken } from './authorization';

export async function search(term) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return [];
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return [];
    }

    const tracks = jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      imgSrc: track.album.images[0].url,
      uri: track.uri,
    }));

    return tracks;
  } catch (error) {
    console.log('Spotify search error:', error);
    throw error;
  }
}

export async function savePlaylist(playlistName, tracksUri) {
  if (!(playlistName && tracksUri)) return;

  try {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const jsonResponse = await response.json();
    const userId = jsonResponse.id;

    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
        }),
      }
    );
    const playlistJsonResponse = await playlistResponse.json();
    const playlistId = playlistJsonResponse.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: tracksUri,
      }),
    });

    console.log('Songs added to playlist');
  } catch (error) {
    console.log('Error while saving the playlist:', error);
    throw error;
  }
}