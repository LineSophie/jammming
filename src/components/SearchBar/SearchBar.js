/*
 This component renders a search bar where users can input a search term. 
 It manages the state of the search term and provides a button to initiate the search. 
 It invokes a callback function when the search button is clicked with the entered search term.
*/
import React, { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {

  const [term, setTerm] = useState('');

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      if (term.length > 0) {
        onSearch(term);
      }
    },
    [onSearch, term]
  );

  return (
    <div> 
      <input
        placeholder='Search Song..'
        type='text'
        onChange={handleTermChange}
        id='search-bar'
      />

      <br/>
      <button
        className={styles.searchBtn}
        onClick={handleSearch} >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;