import React from 'react';
import { Container } from 'react-bootstrap';
import { SearchForm } from './';

function Home() {

  return (
    <Container>
      <h1>TV Show Ratings</h1>
      <h6>Graph of episode ratings of the entire series history</h6>
      <SearchForm />
    </Container>
  );
}

export default Home;