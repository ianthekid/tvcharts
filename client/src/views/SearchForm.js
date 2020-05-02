import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { SearchAutoComplete } from './'

function SearchForm() {

  const [query, setQuery] = useState('');
  const history = useHistory();
  const wrapperRef = useRef(null);

  function handleChange(e){
    setQuery(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    setQuery('')
    history.push(`/search/${query}`)
  }

  return (
    <Form onSubmit={handleSearch}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={10} ref={wrapperRef}>
          <Form.Group controlId="showTitle" className="mb-0">
            <Form.Control 
              type="text" 
              onChange={handleChange}
              value={query}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              placeholder="example: The Office" />
          </Form.Group>
          <SearchAutoComplete 
            query={query}
            parent={wrapperRef}
          />
        </Col>
        <Col xs={2} className="text-left pl-0">
          <Button type="submit">Go</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;