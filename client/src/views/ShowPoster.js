import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { api } from '../lib/'

function ShowPoster(props) {

  const [poster, setPoster] = useState('');

  useEffect(() => {
    api.poster(props.tconst).then(res => setPoster(res))
  }, [props.tconst]);

  return (
    <a href={props.link} target={props.target} className="poster">
      <Image fluid src={poster} className="p-1" />
    </a>    
  );
}

export default ShowPoster;