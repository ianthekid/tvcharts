import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';

function SearchForm() {

  const [query, setQuery] = useState('');
  const history = useHistory();

  function handleChange(e){
    setQuery(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    setQuery('')
    history.push(`/search/${query}`)
  }

  return (
    <Form onSubmit={handleSearch} className="mt-3">
      <Row>
        <Col xs={10}>
          <Form.Group controlId="showTitle">
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={query}
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