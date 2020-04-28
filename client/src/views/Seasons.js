import React, { useState, useEffect, useCallback } from 'react';
import { Episode, Loading } from './';
import { Row, Col } from 'react-bootstrap';
import windowResize from '../lib/windowResize';
import api from '../lib/api';

function Seasons(props) {

  const [seasons, setSeasons] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [maxRows, setMaxRows] = useState(1);

  const setShowtconst = useCallback((tconst) => {
    api.episodes(tconst)
    .then((res) => {
      setSeasons(res.seasons);
      setLoading(false);
      handleAllSeasons(res.allEpisodes);
      //find highest episode number for Y-Axis 'episodeRows'
      let max = res.allEpisodes.reduce((max, p) => p.episodeNumber > max ? p.episodeNumber : max, res.allEpisodes[0].episodeNumber);
      setMaxRows(max);
      //resize window if chart is wider than viewport
      handleScale(windowResize.scale('ratings'))
    })
  }, [ props.tconst ]);

  const handleAllSeasons = useCallback(allSeasons => {
    props.handleAllSeasons(allSeasons)
  }, [])

  const handleScale = useCallback((scale) => {
    props.handleScale(scale)
  }, [])

  useEffect(() => {
    setShowtconst(props.tconst)
    //Resize window trigger with debounce timer
    const handleResize = windowResize.debounce(e => {
      let scale = windowResize.scale('ratings');
      handleScale(scale)
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ props.tconst, handleScale, setShowtconst ])

  //Episode row count as first column
  var episodeRows = []
  for (var i=1; i<=maxRows; i++) {
    episodeRows.push(<Col key={i} className="episodeRows mb-1 d-flex justify-content-center align-items-center">{i}</Col>)
  }

  return (
    <Row>
      {!isLoading && (
        <Col xs={1} className="mx-0 p-0" style={{maxWidth: '3rem'}}>
          <strong>&nbsp;</strong>
          {episodeRows}
        </Col>
      )}
      {isLoading ? (
        <Loading message={`Loading ${props.episodeCount} episodes...`} />
      ) : (
        Object.keys(seasons).map((s,index) => (
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
      )}
    </Row>
  );
}

export default Seasons;