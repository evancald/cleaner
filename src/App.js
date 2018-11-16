import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Route component={Nav} />
        { routes }
      </div>
    );
  }
}

export default App;
