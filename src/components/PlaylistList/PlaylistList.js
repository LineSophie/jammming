/*
 This component displays the list of tracks that the user has added to their playlist.
 It receives the playlistSongs array and renders the results via the TrackList component.
 It also allows users to remove songs, change the playlist name, and save the playlist to Spotify.
*/

import React, {useCallback} from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './PlaylistList.module.css';

const PlaylistList = ({ playlistSongs, onRemove, onNameChange, onSavePlaylist }) => {

  const handlePlaylistNameChange = useCallback((event) => {
    onNameChange(event.target.value);
  }, [onNameChange]);

  return (
    <div className={styles.trackContainer}>
      <div className={styles.playlistBody}>

        <form className={styles.formStyle}>
          <input
            type="text"
            id="playlist-form"
            placeholder="Name Your Playlist.."
            onChange={handlePlaylistNameChange}
            className={styles.namePlaylist}
          />
        </form>

          <TrackList
            tracks={playlistSongs}
            isRemoval={true} 
            onRemove={onRemove} />

        <div className={styles.center}>
          <button 
            onClick={onSavePlaylist}
            className={styles.btnSave} >
           SAVE TO SPOTIFY
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlaylistList;