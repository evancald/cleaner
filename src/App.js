import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import routes from './routes';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route component={Nav} />
        { routes }
      </div>
    );
  }
}

export default App;
