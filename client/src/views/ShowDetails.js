import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

function ShowDetails(props) {

  const [data, setData] = useState({});
  const [endYear, setEnd] = useState('');

  useEffect(() => {
    setData(props.show);
    setEnd((props.show.endYear === "\\N") ? '' : props.show.endYear )
  }, [props.show]);

  return (
    <Col className="text-left">
      <Row>
        { /*
        <a href={`https://www.imdb.com/title/${data.tconst}/`} target="_blank">
          <Image fluid src={data.poster} className="p-2" />
        </a>
      */ }
      </Row>
      <a href={`https://www.imdb.com/title/${data.tconst}/`} target="_blank">
        <h4>{data.primaryTitle}</h4>
      </a>
      <h6>{data.startYear} - {endYear}</h6>
      <h4>
        <strong className='pr-2'>{data.averageRating}</strong>
        <small>({(data.numVotes) && data.numVotes.toLocaleString()})</small>
      </h4>
    </Col>
  );
}

export default ShowDetails;