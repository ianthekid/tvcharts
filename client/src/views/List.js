import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function List(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList( props.episodes )
  }, [props]);

  return (
    <Row>
      {list.map((ep, i) => (
        <Col xs={12} key={i} className={`d-inline-flex flex-columns list-${Math.floor(ep.averageRating)}`}>
          <div>{ep.averageRating.toFixed(1)}</div>
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