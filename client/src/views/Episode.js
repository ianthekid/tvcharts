import React, { useState, useEffect, useCallback } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

function getRatings(tconst) {
  return fetch(`http://localhost:3001/ratings/${tconst}`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of objs [{season: #, episodes: []}]
    return response;
  });
}


function Episode(props) {

  const [ratings, setratings] = useState(props.rating);

  useEffect(() => {
    if(props.rating === "N/A") {
      getRatings(props.imdb)
      .then((res) => {
        setratings(res.averageRating)
      })  
    }
  }, [props]);

  return (
    <Col className={`mb-1 d-flex justify-content-center align-items-center rating-${Math.floor(ratings)}`}>
      <a data-tip data-for={props.id} href={`https://www.imdb.com/title/${props.imdb}/`} target="_blank">
        {ratings}
      </a>
      <ReactTooltip id={props.id}>
        <span>{props.title}</span>
      </ReactTooltip>
    </Col>
  );
}

export default Episode;