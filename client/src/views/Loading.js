import React, { useState, useEffect } from 'react';
import { Col, Spinner } from 'react-bootstrap';

function Loading(props) {

  const [message, setMsg] = useState('');
  
  useEffect(() => {
    setMsg(props.message)
  }, [ props.message ]);

  return (
    <Col className="vh-100 d-flex flex-rows justify-content-center align-items-start text-primary">
      <Spinner animation="border" variant="primary" />
      <h2 className="ml-2">
        {message}
      </h2>
    </Col>
  );
}

export default Loading;