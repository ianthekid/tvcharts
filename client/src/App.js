import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, Search, Show } from './views';
import './styles/App.scss';

function App() {

  return (
    <div className="App">
      <Container fluid>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/show/:tconst" component={Show} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
