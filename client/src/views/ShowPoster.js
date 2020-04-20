import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import api from '../api'

function ShowPoster(props) {

  const [poster, setPoster] = useState('');

  useEffect(() => {
    api.poster(props.tconst).then(res => setPoster(res))
  }, [props.tconst]);

  return (
    <a href={props.link} target={props.target}>
      <Image fluid src={poster} className="p-2" />
    </a>    
  );
}

export default ShowPoster;