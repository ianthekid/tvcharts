import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ShowPoster } from  './'

function ShowDetails(props) {

  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.show);
  }, [props.show]);

  return (
    <Col className="text-left">
      <Row>
        <ShowPoster 
          tconst={data.tconst}
          target="_blank"
          link={`https://www.imdb.com/title/${data.tconst}/`}
        />
      </Row>
      <a href={`https://www.imdb.com/title/${data.tconst}/`} target="_blank">
        <h4>{data.primaryTitle}</h4>
      </a>
      <h6>{data.startYear} - {(data.endYear === "\\N") ? '' : data.endYear}</h6>
      <h4>
        <strong className='pr-2'>{data.averageRating}</strong>
        <small>({(data.numVotes) && data.numVotes.toLocaleString()})</small>
      </h4>
    </Col>
  );
}

export default ShowDetails;