import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

function Episode(props) {

  const [ep, setEp] = useState(props.episode);

  useEffect(() => {
    setEp(props.episode)
  }, [props]);

  return (
    <Col className={`mb-1 d-flex justify-content-center align-items-center rating-${Math.floor(ep.averageRating)}`}>
      <a data-tip data-for={props.id} href={`https://www.imdb.com/title/${ep.tconst}/`} target="_blank">
        {ep.averageRating}
      </a>
      <ReactTooltip id={props.id}>
        <h6 className='mb-0'>{ep.title}</h6>
        <em>{ep.numVotes.toLocaleString()} votes</em>
      </ReactTooltip>
    </Col>
  );
}

export default Episode;