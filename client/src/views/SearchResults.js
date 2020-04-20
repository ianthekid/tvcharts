import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShowPoster } from './'

function SearchResults(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.shows)
  }, [props.shows]);

  return (
    <Row>
      {list.map((s, i) => (
        <Col xs={6} sm={4} md={3} key={i} className='text-center p-3'>
          <ShowPoster 
            tconst={s.tconst}
            target="_self"
            link={`/show/${s.tconst}`}
          />
          <Link to={`/show/${s.tconst}`}>
            <h5 className='mt-2 mb-0'>
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