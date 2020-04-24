import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function List(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.episodes)
  }, [props]);

  //don't add decimal for perfect 10 rating
  const rating = (r) => (r === 10) ? 10 : r.toFixed(1);

  return (
    <Row>
      {list.map((ep, i) => (
        <Col xs={12} key={i} className={`d-inline-flex flex-columns list-${Math.floor(ep.averageRating)}`}>
          <div>{rating(ep.averageRating)}</div>
          <span className="text-left">
            <a href={`https://www.imdb.com/title/${ep.tconst}/`} target="_blank" rel="noopener noreferrer">
              {ep.title}
            </a>
          </span>
        </Col>
      ))}
    </Row>
  );
}

export default List;