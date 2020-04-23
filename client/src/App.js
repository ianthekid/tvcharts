import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { About, Header, Home, Search, Show } from './views';
import './styles/App.scss';

function App() {

  return (
    <div className="App">
      <Container fluid>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-ian-ray" component={About} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/show/:tconst" component={Show} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
