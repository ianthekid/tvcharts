import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Episode, Loading } from './';
import windowResize from '../lib/windowResize';
import calculateScale from '../lib/calculateScale';
import api from '../lib/api';

function Seasons(props) {
 
  const [seasons, setSeasons] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [maxRows, setMaxRows] = useState(1);

  //redux state: window scale params
  const dispatch = useDispatch();
  const ratingsRef = useRef();
  const handleScale = windowResize(ratingsRef);

  const setShowtconst = useCallback((tconst) => {
    api.episodes(tconst)
    .then((res) => {
      setLoading(false);
      setSeasons(res.seasons);
      //find highest episode number for Y-Axis 'episodeRows'
      setMaxRows(res.allEpisodes.reduce((max, p) => p.episodeNumber > max ? p.episodeNumber : max, res.allEpisodes[0].episodeNumber));
      dispatch({type: 'SEASONS', payload: res.allEpisodes})
      //Set scale after load
      dispatch({type: 'RESIZE', payload: calculateScale(ratingsRef)})
    })
  }, []);

  useEffect(() => {
    setShowtconst(props.tconst)

    //Resize window scale
    dispatch({type: 'RESIZE', payload: handleScale})
  }, [ props.tconst, handleScale ])

  //Episode row count as first column
  var episodeRows = []
  for (var i=1; i<=maxRows; i++) {
    episodeRows.push(<Col key={i} className="episodeRows mb-1 d-flex justify-content-center align-items-center">{i}</Col>)
  }

  return isLoading ? (
    <Loading message={`Loading ${props.episodeCount} episodes...`} />
    ) : (
    <Row ref={ratingsRef}>
      <Col xs={1} className="mx-0 p-0" style={{maxWidth: '3rem'}}>
        <strong>&nbsp;</strong>
        {episodeRows}
      </Col>
      { Object.keys(seasons).map((s,index) => (
          <Col xs={1} key={index} className="mr-1 p-0">
            <strong>{s}</strong>
            {seasons[s].map((e,i) => (
              <Episode
                key={i}
                episode={e}
                scale={props.scale}
                id={`S${e.seasonNumber}E${e.episodeNumber}`}
              />
            ))}
          </Col>
        ))
      }
    </Row>
  );
}

export default Seasons;