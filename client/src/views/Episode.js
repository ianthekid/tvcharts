import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

function Episode(props) {

  const [ep, setEp] = useState(props.episode);
  
  useEffect(() => {
    setEp(props.episode)
  }, [ props.episode ]);

  const handleHover = (e,z) => {
    let col = e.target.closest('.col-1');
    col.style.zIndex = z
  }

  const tipT = (props.scale < 0.6) ? 'h4 mb-0' : '';
  const tipV = (props.scale < 0.6) ? 'h6 mb-0' : '';

  return (
    <Col className={`rating-${Math.floor(ep.averageRating)} mb-1 d-flex justify-content-center align-items-center`}>
      <a target="_blank"
        rel="noopener noreferrer" 
        data-tip data-for={props.id} 
        href={`https://www.imdb.com/title/${ep.tconst}/`}
        onMouseOver={(e) => handleHover(e,2)}
        onMouseOut={(e) => handleHover(e,1)}
      >
        {ep.averageRating}
      </a>
      <ReactTooltip id={props.id} type="dark">
        <h6 className={tipT}>{ep.title}</h6>
        <em className={tipV}>{ep.numVotes.toLocaleString()} votes</em>
      </ReactTooltip>
    </Col>
  );
}

export default Episode;