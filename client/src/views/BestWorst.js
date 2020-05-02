import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { List } from './';

function BestWorst(props) {

  const [best, setBest] = useState([]);
  const [worst, setworst] = useState([]);
  const seasons = useSelector(state => state.seasons);

  useEffect(() => {
    seasons.sort((a, b) => a.averageRating - b.averageRating);
    setBest( seasons.slice(-3).reverse() )
    setworst( seasons.slice(0, 3).reverse() )
  }, [seasons]);

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