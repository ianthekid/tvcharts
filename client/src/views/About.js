import React, { useEffect } from 'react';
import { Container, Col, Image } from 'react-bootstrap';
import { pageTitle } from '../lib/';
import ian from '../img/ian-ray.webp';
import jpg from '../img/ian-ray.jpg';

function About() {

  useEffect(() => pageTitle('about',''));

  return (
    <Container className="mt-3 d-flex flex-column justify-content-center align-items-center">
      <picture>
        <source srcSet={ian} type="image/webp" />
        <source srcSet={jpg} type="image/jpeg" />
        <Image src={jpg} roundedCircle alt="Ian Ray Monkey" />
      </picture>
      <h1 className="text-primary">Ian Ray</h1>
      <h4>Developer for hire</h4>
      <Col sm={12} md={10} lg={7} className="text-left my-3 px-1">
        <p>I built TVCharts as a way of displaying my technical abilities to companies looking to hire a frontend or full stack developer. TVCharts is a simple frontend / backend application using an API and multi-container deployment. It ingests raw data from IMDb datasets into a document store, then allows users to search and display results as charts of episode ratings over the entire run of a TV series.</p>
        <strong>Built With:</strong>
        <ul>
          <li>React / Redux</li>
          <li>NodeJS / Express</li>
          <li>MongoDB</li>
          <li>Nginx / letsencrypt</li>
          <li>Docker</li>
          <li>AWS CDN (S3 + CloudFront)</li>
        </ul>
        <p>I documented the technical specs and my learning experiences in <a href="https://medium.com/@ianthekid/creating-a-web-application-to-display-charts-of-tv-shows-ratings-for-every-episode-9b9d9b393b90">this blog post</a></p>
        <p>Please review the code on <a href="https://github.com/ianthekid/tvcharts">GitHub</a> or email me directly <a href="mailto:ian@ianray.com">ian@ianray.com</a></p>
      </Col>
    </Container>
  );
}

export default About;