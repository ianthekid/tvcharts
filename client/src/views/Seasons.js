import React, { useState, useEffect, useCallback } from 'react';
import { Episode } from './';
import { Row, Col } from 'react-bootstrap';

function getSeasons(tconst) {
  return fetch(`http://localhost:3001/show/${tconst}/seasons`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of objs [{season: #, episodes: []}]
    return response;
  });
}

function combineSeasons(seasons, cb) {
  var show = [];
  seasons.map(s => {
    s.episodes.map(item => show.push(item))
  })
  return cb(show);
}

function Seasons(props) {

  const [seasons, setSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const setShowtconst = useCallback((tconst) => {
    getSeasons(tconst)
    .then((res) => {
      setSeasons(res);
      setLoading(false);
      combineSeasons(res, (data) => handleAllSeasons(data))
    })
  }, []);

  const handleAllSeasons = useCallback((allSeasons) => {
    props.handleAllSeasons(allSeasons)
  }, [])

  useEffect(() => {
    setShowtconst(props.tconst)
  }, [ props.tconst ]) 

  return (
    <Row>
      {isLoading && <div>Loading ...</div>}
      {seasons.map((s,index) => (
        <Col xs={1} key={index} className="mr-1 p-0">
          <strong>{s.season}</strong>
          {s.episodes.map((e,i) => (
            <Episode
              key={i}
              title={e.Title}
              imdb={e.imdbID}
              rating={e.imdbRating}
              id={`S${s.season}E${e.Episode}`}
            />
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default Seasons;