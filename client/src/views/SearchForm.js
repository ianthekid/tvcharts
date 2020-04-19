import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

function SearchForm(props) {

  const [search, setSearch] = useState('');

  function handleChange(e) {
    props.handleChange(e.target.value);
  }

  function handleSearch(e) {
    props.handleSearch(e);
  }
  
  useEffect(() => {
    setSearch(props.search)
  }, [ props.search ]) 

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col xs={10}>
          <Form.Group controlId="showTitle">
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={search}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              placeholder="example: The Office" />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;