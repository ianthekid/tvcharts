import React, { useState, useEffect } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';


function getShow(title, callback) {
  fetch(`http://tvratingschart.com/api/find/basics/${encodeURIComponent(title)}`)
  .then(res => res.json())
  .then(data => callback(data));
}

function getEpisodes(tconst) {
  return fetch(`http://tvratingschart.com/api/show/${tconst}`)
  .then(res => res.json())
  .then(function(response) {

    //Data returns array of objs unsorted. Group into obj for each season
    let sorted = response.reduce((r, a) => {
        r[a.seasonNumber] = r[a.seasonNumber] || [];
        r[a.seasonNumber].push(a);
        //sort season obj by episode
        r[a.seasonNumber].sort((a,b) => (a.episodeNumber > b.episodeNumber) ? 1 : ((b.episodeNumber > a.episodeNumber) ? -1 : 0));
        return r;
    }, Object.create(null));

    return sorted;
  });
}

function Show(props) {
  const [show, setShow] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getShow(props.match.params.imdbID, data => setShow(data))
    getEpisodes(props.match.params.imdbID)
    .then((res) => { 
      setAllSeasons(res)
      setLoading(false);
    })
  }, [props]);

  console.log(show)
console.log(props.match.params.imdbID)

/*
return <div></div>
*/
  return (
    <div className="p-3">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row>
          <Col lg={2} md={3} sm={4}>
            <ShowDetails
              year={show.startYear}
              title={show.primaryTitle}
              poster={''}
              imdbID={show.tconst}
              imdbVotes={''}
              imdbRating={''}
            />
            <BestWorst seasons={allSeasons} />
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" className="pl-4">
            <Seasons
              count={Object.keys(show).length}
              tconst={show.tconst}
              handleAllSeasons={setAllSeasons}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Show;
