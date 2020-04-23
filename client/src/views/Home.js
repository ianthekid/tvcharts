import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { SearchForm } from './';
import logo from '../logo.svg'

function Home() {

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Image id="logo" src={logo} fluid /> 
      <h1 className="text-primary">TV Charts</h1>
      <h6>Episode ratings for entire series</h6>
      <SearchForm />
    </Container>
  );
}

export default Home;