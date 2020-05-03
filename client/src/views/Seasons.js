import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Episode, EpisodeCount, Loading } from './';
import { api, calculateScale, windowResize} from '../lib/';

function Seasons(props) {
 
  const [seasons, setSeasons] = useState({});
  const [isLoading, setLoading] = useState(true);

  //redux state: window scale params
  const dispatch = useDispatch();
  const ratingsRef = useRef();
  const handleScale = windowResize(ratingsRef);

  const setShowtconst = useCallback((tconst) => {
    api.episodes(tconst)
    .then((res) => {
      setLoading(false);
      setSeasons(res.seasons);
      dispatch({type: 'EPISODES', payload: res.allEpisodes});
      dispatch({type: 'RESIZE', payload: calculateScale(ratingsRef)});
    })
  }, []);

  useEffect(() => {
    setShowtconst(props.tconst)
    dispatch({type: 'RESIZE', payload: handleScale})
  }, [ props.tconst, handleScale ])


  return isLoading ? (
    <Loading message={`Loading ${props.episodeCount} episodes...`} />
    ) : (
    <Row ref={ratingsRef}>
      <EpisodeCount />
      { Object.keys(seasons).map((s,index) => (
        <Col xs={1} key={index} className="mr-1 p-0">
          <strong>{s}</strong>
          { seasons[s].map((e,i) => (
            <Episode
              key={i}
              num={i}
              episode={e}
              scale={props.scale}
              id={`S${e.seasonNumber}E${e.episodeNumber}`}
            />
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default Seasons;