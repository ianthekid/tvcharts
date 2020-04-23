import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row, Image } from 'react-bootstrap';
import { SearchForm } from './';
import logo from '../logo.svg'

function Header() {

  const [path, setPath] = useState('')
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname]);

  const spacer = <Col md={1} lg={2} className="d-none d-sm-none d-md-block"></Col>;

  const header = (path !== "/") && (
    <Row className="bg-light d-flex align-items-center py-2 mb-2">
      <Col xs={2} className="text-left">
        <Link to="/" className="d-flex">
          <Image id="logo" src={logo} fluid />
          <h5 className="ml-2 d-none d-sm-none d-md-block">TV Charts</h5>
        </Link>
      </Col>
      {spacer}
      <Col xs={8} md={6} lg={4}>
        <SearchForm />
      </Col>
      {spacer}
      <Col xs={2} className="text-right">
        <Link to="/about-ian-ray">
          hire me
        </Link>
      </Col>
    </Row>
  );

  return header;
}

export default Header;