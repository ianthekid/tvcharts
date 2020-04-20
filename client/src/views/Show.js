import React, { useState, useEffect, useCallback } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';
import api from '../api';
import pageTitle from '../pageTitle';

function Show(props) {
  const [show, setShow] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const handleShow = useCallback((tconst) => {
    api.show(tconst).then(data => {
      setShow(data)
      setLoading(false)
      pageTitle('show', data.primaryTitle)
    })
  }, [])

  useEffect(() => {
    handleShow(props.match.params.tconst)
  }, [props.match.params.tconst, handleShow]);

  return (
    <div className="p-3">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row>
          <Col lg={2} md={3} sm={4}>
            <ShowDetails show={show} />
            <BestWorst seasons={allSeasons} />
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" className="pl-4" style={{transform: `scale(${scale}`}}>
            <Seasons
              tconst={show.tconst}
              handleAllSeasons={setAllSeasons}
              handleScale={setScale}
              scale={scale}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Show;
