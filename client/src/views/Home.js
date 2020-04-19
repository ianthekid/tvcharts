import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { SearchForm } from './';

function Home() {

  const [query, setQuery] = useState('');
  const history = useHistory();

  function handleChange(input){
    setQuery(input)
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/search/${query}`)
  }

  return (
    <Container>
      <h1>TV Show Ratings</h1>
      <h6>Graph of episode ratings of the entire series history</h6>
      <SearchForm
        handleSearch={handleSearch}
        handleChange={handleChange}
        search={query}
      />
    </Container>
  );
}

export default Home;