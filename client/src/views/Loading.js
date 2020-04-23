import React, { useState, useEffect } from 'react';
import { Col, Spinner } from 'react-bootstrap';

function Loading(props) {

  const [message, setMsg] = useState('');
  
  useEffect(() => {
    setMsg(props.message)
  }, [ props.message ]);

  return (
    <Col className="vh-100 d-flex flex-column justify-content-center align-items-center text-primary">
      <Spinner animation="grow" variant="primary" />
      <h2 className="mt-2">
        {message}
      </h2>
    </Col>
  );
}

export default Loading;