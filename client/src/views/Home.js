import React from 'react';
import { Container } from 'react-bootstrap';
import { SearchForm } from './';

function Home() {

  return (
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>TV Charts</h1>
      <h6>Episode ratings for the entire run of series</h6>
      <SearchForm />
    </Container>
  );
}

export default Home;