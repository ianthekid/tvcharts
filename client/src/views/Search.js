import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { SearchForm, SearchResults } from './';
import api from '../api';
import pageTitle from '../pageTitle';

function Search(props) {

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleQuery = useCallback((q) => {
    //Reset data
    setQuery(q)
    setError(false)
    setLoading(true)
    setResults([])

    api.search(q).then(res => {
      if(res.response === false) {
        setError(true)
      } else {
        setError(false)
        setResults(res.results)
        pageTitle('search', q)
      }
      setLoading(false);
    })  
  }, []);
  
  useEffect(() => {
    handleQuery(props.match.params.query)
  }, [ props.match.params.query, handleQuery ]) 

  return (
    <Container>
      <SearchForm />
      {(isLoading) &&
        <div>Searching ...</div>
      }
      {(results.length > 0 || error) &&
        <Row><Col className="text-left">Search results for "{query}"</Col></Row>
      }
      {(error) &&
        <Alert variant="danger">No Results Found</Alert>
      }
      {(results.length > 0) &&
        <SearchResults shows={results} />
      }
    </Container>
  );
}

export default Search;