import React, { useState, useEffect } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';


function getShow(title, callback) {
  fetch(`http://tvratingschart.com/api/show/${encodeURIComponent(title)}`)
  .then(res => res.json())
  .then(data => callback(data[0]));
}

function Show(props) {
  const [show, setShow] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getShow(props.match.params.tconst, (data) => {
      setShow(data)
      setLoading(false)
    })
  }, [props.match.params.tconst]);

  return (
    <div className="p-3">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row>
          <Col lg={2} md={3} sm={4}>
            <ShowDetails show={show} />
            <BestWorst seasons={allSeasons} />
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" className="pl-4">
            <Seasons
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
