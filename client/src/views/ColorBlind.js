import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

function ColorBlind(props) {

  const dispatch = useDispatch();
  const cbFriendly = useSelector(state => state.colorblind);

  const handleChange = (() => {
    dispatch({type: 'COLOR_BLIND', payload: !cbFriendly})
  });

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