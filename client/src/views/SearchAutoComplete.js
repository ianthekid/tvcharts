import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { SearchResults } from './';
import { api, useDebounce } from '../lib/';

function SearchAutoComplete(props) {
  const [display, setDisplay] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const wrapperRef = props.parent;

  //Delay running search on user input
  const debouncedSearchTerm = useDebounce(props.query, 600);

  useEffect(() => {
    if(debouncedSearchTerm) {
      setOptions([])
      setLoading(true)
      setDisplay(true)
      api.search(debouncedSearchTerm)
      .then((res) => {
        setOptions(res);
        setLoading(false);
      })
    } else {
      setOptions([])
      setLoading(false);
      setDisplay(false)
    }
  }, [ debouncedSearchTerm ]);

  //Hide SearchResults if interaction outside of autocomplete
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return display && (
    <div className="position-fixed vh-100 overflow-auto p-0 col-lg-4 col-md-6 col-8" style={{zIndex: '999'}}>
      {isLoading && 
        <div className="bg-light text-left d-flex flex-rows p-3">
          <Spinner animation="border" variant="primary" size="sm" />
          <h6 className="ml-3">Searching</h6>
        </div>
      }
      {(options.length > 0) &&
        <SearchResults shows={options} small={true} />      
      }
    </div>
  );
}

export default SearchAutoComplete;