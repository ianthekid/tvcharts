import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function List(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList( props.episodes )
  }, [props]);

  return (
    <Col>
      {list.map((ep, i) => (
        <Row key={i}>
          <Col xs={2}>{ep.averageRating}</Col>
          <Col className="text-left">
            <a href={`https://www.imdb.com/title/${ep.tconst}/`} target="_blank" rel="noopener noreferrer">
              {ep.title}
            </a>
          </Col>
        </Row>
      ))}
    </Col>
  );
}

export default List;