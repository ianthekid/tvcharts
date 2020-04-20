import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { SearchForm, SearchResults } from './';
import api from '../api';
import pageTitle from '../pageTitle';

function Search(props) {

  const history = useHistory();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function handleChange(input){
    setSearch(input)
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/search/${search}`)
  }

  const handleQuery = useCallback((q) => {
    //Reset data
    setSearch('')
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
      <SearchForm
        handleSearch={handleSearch}
        handleChange={handleChange}
        search={search}
      />
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