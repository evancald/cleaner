import React, { Component } from 'react';

class Nav extends Component {
  render() {
    if (this.props.location.pathname !== '/' ) {
      return (
        <div>
          Nav
        </div>
      )
    } else {
      return null;
    }
  }
}

export default Nav;