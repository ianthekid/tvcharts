import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import { SearchForm } from './';
import pageTitle from '../pageTitle';
import logo from '../logo.svg'

function Home() {

  useEffect(() => pageTitle('home',''));

  const examples = [
    {tconst: "tt3032476", title: "Better Call Saul"},
    {tconst: "tt0386676", title: "The Office (US)"},
    {tconst: "tt0944947", title: "Game of Thrones"},
    {tconst: "tt0472954", title: "It's Always Sunny in Philadelphia"},
    {tconst: "tt0903747", title: "Breaking Bad"},
    {tconst: "Simpsons", title: "The Simpsons"}
  ]

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Image id="logo" src={logo} fluid /> 
      <h1 className="text-primary">TV Charts</h1>
      <h6 className="mb-3">Charts of TV Show Ratings for Entire Series</h6>
      <SearchForm />
      <div id="examples">
        <div className="slides">
          {examples.map((ex,i) => (
            <div key={i} className="slide small font-italic">
              example: <Link to={`/show/${ex.tconst}`}>{ex.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2">created by <Link to="/about-ian-ray">ian ray</Link></p>
    </Container>
  );
}

export default Home;