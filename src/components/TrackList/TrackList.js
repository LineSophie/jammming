/*
This component displays a list of tracks.
It receives an array of tracks as a prop and renders each track using the Track component. 
It provides the ability to add or remove tracks from the playlist based on the isRemoval prop.
*/

import React from 'react';
import Track from '../Track/Track';
import styles from './TrackList.module.css';

const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {

    return (
        <div className={styles.TrackList}>
         
            {tracks.map((track) => {
                return(
                    <Track 
                    track={track}
                    key={track.id}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval} />
                );
            })}

      </div> 
    );
};

export default TrackList;