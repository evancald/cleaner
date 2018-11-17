import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUsername, updatePassword } from '../../ducks/reducer';
import axios from 'axios';

class Auth extends Component {

  login = () => {
    axios.post('/api/auth/login', {
      username: this.props.username,
      password: this.props.password
    })
    .then((response) => {
      if (response.data) {
        this.props.history.push('/dashboard');
      } else {
        window.alert('Incorrect username or password');
      }
    })
  }

  register = () => {
    axios.post('/api/auth/register', {
      username: this.props.username,
      password: this.props.password
    })
    .then(() => {
      window.alert('Your account was created successfully. Logging you in now.');
      this.login();
    })
  }

  render() {
    const { updateUsername, updatePassword } = this.props;
    return (
      <div>
        Auth:
        <br />
        <input onChange={(e) => updateUsername(e.target.value)} type='text' value={this.props.username} placeholder='Username' />
        <input onChange={(e) => updatePassword(e.target.value)} type='password' value={this.props.password} placeholder='Password' />
        <br />
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { username, password } = state;
  return {
    username,
    password
  }
}

export default connect(mapStateToProps, { updateUsername, updatePassword })(Auth);