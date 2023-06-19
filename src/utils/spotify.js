/*
  This module create an object named Spotify that serves as a wrapper for the getAccessToken, search, and savePlaylist functions. 
*/

import { getAccessToken } from './authorization';
import { search, savePlaylist } from './playlist';

const Spotify = {
  getAccessToken,
  search,
  savePlaylist,
};

export default Spotify;