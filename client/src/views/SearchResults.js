import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShowPoster } from './'

function SearchResults(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.shows)
  }, [props.shows]);

  return props.small ? (
    <ListGroup variant="flush" className="rounded">
      {list.map((s, i) => (
        <ListGroup.Item key={i} action href={`/show/${s.tconst}`} className="text-left bg-light text-white py-1 px-2 mb-0">
          <h6 className='mb-1'>
            {s.primaryTitle}
          </h6>
          <small className="text-muted">
            <em>{s.startYear} - {(s.endYear === "\\N") ? '' : s.endYear}</em>
          </small>
        </ListGroup.Item>
      ))}
    </ListGroup>
    ) : (
    <Row id="results">
      {list.map((s, i) => (
        <Col xs={6} sm={4} md={3} key={i} className='text-center p-1 my-3'>
          <ShowPoster 
            tconst={s.tconst}
            target="_self"
            link={`/show/${s.tconst}`}
          />
          <Link to={`/show/${s.tconst}`}>
            <h5 className='mt-1 mb-0'>
              {s.primaryTitle}
            </h5>
          </Link>
          <em>{s.startYear} - {(s.endYear === "\\N") ? '' : s.endYear}</em>
        </Col>
      ))}
    </Row>
  );
}

export default SearchResults;