import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ShowPoster } from  './'

function ShowDetails(props) {

  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.show);
  }, [props.show]);

  return (
    <Row className="text-left">
      <Col xs={6} sm={10}>
        {data.tconst &&
          <ShowPoster 
            tconst={data.tconst}
            target="_blank"
            rel="noopener noreferrer"
            link={`https://www.imdb.com/title/${data.tconst}/`}
          />      
        }
      </Col>
      <Col xs={12}>
        <h4 className="mb-0">{data.primaryTitle}</h4>
        <small>{data.startYear} - {(data.endYear === "\\N") ? '' : data.endYear}</small>
      </Col>
      <Col xs={12}>
        <h4 className="mt-2">
          <strong className='pr-2'>{data.averageRating}</strong>
          <small>
            ({(data.numVotes) && data.numVotes.toLocaleString()})
          </small>
          <a href={`https://www.imdb.com/title/${data.tconst}/`} target="_blank" rel="noopener noreferrer" className="ml-2 small">
            imdb
          </a>
        </h4>
      </Col>
    </Row>
  );
}

export default ShowDetails;