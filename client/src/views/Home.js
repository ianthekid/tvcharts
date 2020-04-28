import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import { SearchForm } from './';
import pageTitle from '../lib/pageTitle';
import logo from '../img/logo.svg'

function Home() {

  useEffect(() => pageTitle('home',''));

  const examples = [
    {tconst: "tt3032476", title: "Better Call Saul"},
    {tconst: "tt0386676", title: "The Office (US)"},
    {tconst: "tt0944947", title: "Game of Thrones"},
    {tconst: "tt0472954", title: "It's Always Sunny in Philadelphia"},
    {tconst: "tt0903747", title: "Breaking Bad"}
  ]

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Image id="logo" src={logo} fluid /> 
      <h1 className="text-primary">TV Charts</h1>
      <h6 className="mb-3">Chart TV Show Ratings for an Entire Series</h6>
      <SearchForm />
      <div id="examples">
        <div className="slides">
          {examples.map((ex,i) => (
            <div key={i} className="slide small font-italic">
              try: <Link to={`/show/${ex.tconst}`}>{ex.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-muted">
        created by <Link to="/about-ian-ray" className="text-warning">ian ray</Link>
      </p>
    </Container>
  );
}

export default Home;