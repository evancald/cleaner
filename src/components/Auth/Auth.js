import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  render() {
    const { updateUsername, updatePassword } = this.props;
    return (
      <div className="center-form">
        <h1 className="app-name">Cleaner</h1>
        <input onChange={(e) => updateUsername(e.target.value)} type='text' value={this.props.username} placeholder='Username' />
        <input onChange={(e) => updatePassword(e.target.value)} type='password' value={this.props.password} placeholder='Password' />
        <br />
        <div className="auth-buttons">
          <button onClick={this.login}>Login</button>
          <p>Don't have an account? <Link to="/register">Get Started</Link></p>
        </div>
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