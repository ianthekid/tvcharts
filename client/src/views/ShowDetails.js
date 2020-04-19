import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

function ShowDetails(props) {

  const [data, setData] = useState({});

  useEffect(() => {
    setData( props )
  }, [props]);

  return (
    <Col className="text-left">
      <Row>
        <a href={`https://www.imdb.com/title/${data.imdbID}/`} target="_blank">
          <Image fluid src={data.poster} className="p-2" />
        </a>
      </Row>
      <a href={`https://www.imdb.com/title/${data.imdbID}/`} target="_blank">
        <h4>{data.title}</h4>
      </a>
      <h6>{data.year}</h6>
      <h6>Rating: <strong>{data.imdbRating}</strong> <em>({data.imdbVotes})</em></h6>
    </Col>
  );
}

export default ShowDetails;