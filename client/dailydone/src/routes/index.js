import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import List from '../pages/List';
import Login from '../pages/Login';

class Main extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/today" exact component={List} />
          <Route path="/week" exact component={List} />
          <Route path="/month" exact component={List} />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Main;