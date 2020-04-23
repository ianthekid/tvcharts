import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { List } from './';

function BestWorst(props) {

  const [best, setBest] = useState([]);
  const [worst, setworst] = useState([]);

  useEffect(() => {
    props.seasons.sort((a, b) => a.averageRating - b.averageRating);
    setBest( props.seasons.slice(-3).reverse() )
    setworst( props.seasons.slice(0, 3).reverse() )
  }, [props]);

  return (
    <Col className="text-left mt-2 mb-4">
      <Row><h6>Best Episodes</h6></Row>
      {(best.length > 0) &&  <List episodes={best} />}

      <Row><h6 className="mt-3">Worst Episodes</h6></Row>
      {(worst.length > 0) && <List episodes={worst} />}
    </Col>
  );
}

export default BestWorst;