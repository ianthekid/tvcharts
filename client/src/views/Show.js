import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BestWorst, ColorBlind, Loading, Seasons, ShowDetails } from './';
import api from '../lib/api';
import pageTitle from '../lib/pageTitle';

function Show(props) {
  const [show, setShow] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  //redux store
  const scale = useSelector(state => state.scale);
  const colorblind = useSelector(state => state.colorblind);
  const colorScheme = (colorblind ? 'cbFriendly' : '');

  const handleShow = useCallback((tconst) => {
    api.show(tconst).then(data => {
      if(!data) {
        setError(true)
        setLoading(false)
      } else {
        setError(false)
        setShow(data)
        setLoading(false)
        pageTitle('show', data.primaryTitle)  
      }
    })
  }, [])

  useEffect(() => {
    handleShow(props.match.params.tconst)
  }, [props.match.params.tconst, handleShow]);


  return (
    <>
    <ColorBlind />
    {isLoading ? (
      <Loading message={'Loading'} />
    ) : (
      <div className={`px-1 ${colorScheme}`}>
      {error ? (
        <Col xs={3}>
          <Alert variant="danger">Show Not Found</Alert>
        </Col>
      ) : (
        <Row>
          <Col lg={2} md={3} sm={4}>
            <Row className="mb-4">
              <Col xs={6} sm={12}><ShowDetails show={show} /></Col>
              <Col xs={6} sm={12}><BestWorst /></Col>
            </Row>
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" style={{transform: `scale(${scale}`}}>
            <Seasons
              tconst={show.tconst}
              episodeCount={show.episodeCount}
            />
          </Col>
        </Row>
      )}      
      </div>
    )}
    </>
  );
}

export default Show;