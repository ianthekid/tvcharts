import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

function ColorBlind(props) {
  const [cbFriendly, setPref] = useState(
    JSON.parse(localStorage.getItem('cbPref')) || false
  );

  const handleChange = (() => {
    let pref = !cbFriendly;
    setPref(pref)
    localStorage.setItem('cbPref', pref);
  });

  useEffect(() => {
    props.status(cbFriendly);
  }, [cbFriendly] );

  return (
    <Row className="d-flex flex-row justify-content-end align-items-center">
      <Button variant="link" onClick={handleChange} className="m-0 p-0 text-muted text-decoration-none">
        <small>color blind?</small>
      </Button>
      <Toggle
        onClick={handleChange}
        active={cbFriendly}
        className="cbToggle"
        onstyle="warning"
        offstyle="light"
        on={'yes'}
        off={'no'}
        height={20}
        width={28}
        size="xs"
      />
    </Row>
  );
}

export default ColorBlind;