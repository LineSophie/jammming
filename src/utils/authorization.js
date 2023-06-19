/*
This module handles the authentication and retrieval of an access token for Spotify. 
It exports a function getAccessToken() that checks if the access token is already available. 
If it is, the function returns the stored access token. 
If not, it redirects the user to the Spotify authorization URL to obtain the access token.
*/

const clientId = '';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';

export async function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');

    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    window.location = accessUrl;
  }
}