import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

function EpisodeCount() {
 
  const [rows, setRows] = useState(1);
  const allEpisodes = useSelector(state => state.episodes);
  const scale = useSelector(state => state.scale);

  useEffect(() => {
    //find highest episode number for Y-Axis 'episodeRows'
    if(allEpisodes.length > 0)
      setRows(allEpisodes.reduce((max, p) => p.episodeNumber > max ? p.episodeNumber : max, allEpisodes[0].episodeNumber));
  }, [ allEpisodes ])

  var episodeRows = []
  for (var i=1; i<=rows; i++) {
    episodeRows.push(<Col key={i} className="episodeRows mb-1 d-flex justify-content-center align-items-center">{i}</Col>)
  }

  const span = (scale < 0.6) ? 'h2' : '';

  return (
    <Col xs={1} className="mx-0 p-0" style={{maxWidth: '3rem'}}>
      <strong>&nbsp;</strong>
      <span className={span}>{episodeRows}</span>
    </Col>
  );
}

export default EpisodeCount;