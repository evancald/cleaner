import React, { Component } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import { updateUsername, updatePassword, updateProfilePicture } from '../../ducks/reducer';
import axios from 'axios';

class Auth extends Component {

  login = () => {
    const { updateUsername, updateProfilePicture } = this.props;
    axios.post('/api/auth/login', {
      username: this.props.username,
      password: this.props.password
    })
    .then((response) => {
      if (response.data) {
        const { username, profile_pic } = response.data;
        updateUsername(username);
        updateProfilePicture(profile_pic);
        this.props.history.push('/dashboard');
      } else {
        window.alert('Incorrect username or password');
      }
    })
  }

  /*
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
  */

  render() {
    const { updateUsername, updatePassword } = this.props;
    return (
      <div className="auth-container">
        Cleaner
        <br />
        <input onChange={(e) => updateUsername(e.target.value)} type='text' value={this.props.username} placeholder='Username' />
        <input onChange={(e) => updatePassword(e.target.value)} type='password' value={this.props.password} placeholder='Password' />
        <br />
        <button onClick={this.login}>Login</button>
        <button onClick={() => this.props.history.push('/register')}>Register</button>
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

export default connect(mapStateToProps, { updateUsername, updatePassword, updateProfilePicture })(Auth);