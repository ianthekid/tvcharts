import React, { useState, useEffect, useCallback } from 'react';
import { Episode } from './';
import { Row, Col } from 'react-bootstrap';

function getEpisodes(tconst) {
  return fetch(`http://tvratingschart.com/api/seasons/${tconst}`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of Objs unsorted. Loop through items and group into ordered Obj for each season
    let sorted = response.reduce((r, a) => {
      r[a.seasonNumber] = r[a.seasonNumber] || [];
      r[a.seasonNumber].push(a);
      //sort season obj by episode
      r[a.seasonNumber].sort((a,b) => (a.episodeNumber > b.episodeNumber) ? 1 : ((b.episodeNumber > a.episodeNumber) ? -1 : 0));
      return r;
    }, Object.create(null));
    //return both for use in BestWorst and Seasons
    return {
      allEpisodes: response,
      seasons: sorted
    };
  });
}

function Seasons(props) {

  const [seasons, setSeasons] = useState({});
  const [isLoading, setLoading] = useState(true);

  const setShowtconst = useCallback((tconst) => {
    getEpisodes(tconst)
    .then((res) => {
      setSeasons(res.seasons);
      handleAllSeasons(res.allEpisodes);
      setLoading(false);
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
      {isLoading ? (
        <div>Loading ...</div>
      ) : Object.keys(seasons).map((s,index) => (
        <Col xs={1} key={index} className="mr-1 p-0">
          <strong>{s}</strong>
          {seasons[s].map((e,i) => (
            <Episode
              key={i}
              episode={e}
              id={`S${e.seasonNumber}E${e.episodeNumber}`}
            />
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default Seasons;