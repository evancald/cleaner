import React, { Component } from 'react';
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

  render() {
    const { updateUsername, updatePassword } = this.props;
    return (
      <div className="center-form">
        Cleaner
        <br />
        <input onChange={(e) => updateUsername(e.target.value)} type='text' value={this.props.username} placeholder='Username' />
        <input onChange={(e) => updatePassword(e.target.value)} type='password' value={this.props.password} placeholder='Password' />
        <br />
        <div className="auth-buttons">
          <button onClick={this.login}>Login</button>
          <button onClick={() => this.props.history.push('/register')}>Register</button>
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