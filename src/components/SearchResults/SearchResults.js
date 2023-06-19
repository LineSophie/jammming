/*
This component displays a list of search results for tracks. 
It receives the searchResults as a prop and renders the results via the TrackList component.
It also provides the ability to add songs to a playlist.
*/  

import React from 'react';
import styles from './SearchResults.module.css';
import TrackList from '../TrackList/TrackList';

const SearchResults = ({ searchResults, onAdd }) => {

  return (
    <div className={styles.trackListContainer}>
      <div className={styles.trackBody}>
        <div className={styles.headerBorder}>
          <h1>Results</h1>
        </div>

          <TrackList 
            tracks={searchResults} 
            onAdd={onAdd} 
          />

      </div>
    </div>
  );
};

export default SearchResults;