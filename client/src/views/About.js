import React from 'react';
import { Container, Col, Image } from 'react-bootstrap';
import ian from '../img/ian-ray.jpg';

function About() {

  return (
    <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
      <Image id="ian" src={ian} roundedCircle />
      <h1 className="text-primary">About Ian Ray</h1>
      <h4>Developer for hire</h4>
      <Col sm={12} md={10} lg={7} className="text-left my-3">
        <p>I built TVCharts as a way of displaying my technical abilities for prospective companies looking to hire a frontend or full stack developer. It is a simple frontend/backend application using an API and multi-container setup that injests the raw data from IMDB datasets.</p>
        <strong>Built With:</strong>
        <ul>
          <li>React</li>
          <li>NodeJS</li>
          <li>MongoDB</li>
          <li>Nginx</li>
          <li>Docker</li>
        </ul>
        <p>I documented my process and learning experiences in <a href="#">this blog post</a> that provides more details on the technical side of this project</p>
        <p>Please review the code on <a href="#">GitHub repo</a> or email me directly <a href="mailto:ian@ianray.com">ian@ianray.com</a></p>
      </Col>
    </Container>
  );
}

export default About;