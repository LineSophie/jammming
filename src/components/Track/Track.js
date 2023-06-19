/*
This component represents a single track in the application. 
It displays information about the track, including the name, artist, album, and image. 
It also provides buttons to add or remove the track from the playlist. 
The behavior of the buttons is determined by the isRemoval prop.
*/

import React, { useCallback } from 'react';
import styles from './Track.module.css';

const Track = ({ track, isRemoval, onAdd, onRemove }) => {

  const addSong = useCallback(() => {
    onAdd(track);
  }, [onAdd, track]);

  const removeSong = useCallback(() => {
    onRemove(track);
  }, [onRemove, track]);

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button onClick={removeSong} className={styles.btnStyle}>
          -
        </button>
      );
    } else {
      return (
        <button onClick={addSong} className={styles.btnStyle}>
          +
        </button>
      );
    }
  };

  return (
    <li className={styles.listItem}>
      <img 
        src={track.imgSrc} 
        className={styles.imgAlbum} 
        alt = 'track-item'
      />

      <div className={styles.text}>
        <h3>{track.name}</h3><br/>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>

      <div className={styles.buttonDiv}>{renderAction()}</div>
    </li>
  );
};

export default Track;