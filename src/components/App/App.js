/*
 This is the main component of the application. 
 It includes a search bar, search results, and a playlist. 
 It manages the state of the search results, playlist songs, and playlist name. 
 It allows users to search for songs, add them to the playlist, remove songs from the playlist, change the playlist name, and save the playlist to Spotify.
*/

import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import PlaylistList from '../PlaylistList/PlaylistList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../utils/spotify';
import swal from 'sweetalert';
import './SweetAlert.css'; 

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const search = useCallback(async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  }, []);

  const addSong = useCallback((track) => {
    if (!playlistSongs.some((song) => song.id === track.id)) {
      setPlaylistSongs((prevPlaylistSongs) => [track, ...prevPlaylistSongs]);
    }
  }, [playlistSongs]);

  const removeSong = useCallback((track) => {
    setPlaylistSongs((prevPlaylistSongs) =>
      prevPlaylistSongs.filter((playlistSong) => playlistSong.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(async () => {
    const tracksUri = playlistSongs.map((track) => track.uri);
    if (playlistSongs.length > 0) {
      await Spotify.savePlaylist(playlistName, tracksUri);
      setPlaylistSongs([]);
      setPlaylistName('New Playlist');
      document.getElementById('playlist-form').value = '';

      swal({
        title: "Success!",
        text: "Your new Playlist has been saved to Spotify!",
        icon: "success",
        button: "Close",
        closeOnClickOutside: false
      });
    } else {
      swal({
        title: "Oooops...",
        text: "You need to add some tracks to your Playlist before saving it!",
        icon: "error",
        button: "Close",
        closeOnClickOutside: false
      });
    }
  }, [playlistSongs, playlistName]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Ja<span className={styles.highlight}>mmm</span>ing</h1>
      </header>
      <div className={styles.backgroundImg}>
        <div className={styles.imgOverlay}>
          <div className={styles.backgroundSearch}>
            <SearchBar onSearch={search} />
          </div>
          <div className={styles.appResults}>
            <SearchResults searchResults={searchResults} onAdd={addSong} />
            <PlaylistList
              playlistSongs={playlistSongs}
              onRemove={removeSong}
              onSavePlaylist={savePlaylist}
              onNameChange={updatePlaylistName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;