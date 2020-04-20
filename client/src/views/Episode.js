import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

function Episode(props) {

  const [ep, setEp] = useState(props.episode);

  useEffect(() => {
    setEp(props.episode)
  }, [props]);

  return (
    <Col className={`rating-${Math.floor(ep.averageRating)} mb-1 d-flex justify-content-center align-items-center`}>
      <a target="_blank"
        data-tip data-for={props.id} 
        href={`https://www.imdb.com/title/${ep.tconst}/`}
      >
        {ep.averageRating}
      </a>
      <ReactTooltip id={props.id} type="dark">
        <h6 className='mb-0'>{ep.title}</h6>
        <em>{ep.numVotes.toLocaleString()} votes</em>
      </ReactTooltip>
    </Col>
  );
}

export default Episode;