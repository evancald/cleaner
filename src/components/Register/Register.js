import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      profilePicture: null,
    }
  }

  handleUsernameChange = (username) => {
    this.setState({username});
  }

  handlePasswordChange = (password) => {
    this.setState({password});
  }

  handlePhotoUpload = (profilePicture) => {
    
  }

  render() {
    return (
      <div>
        Desired Username: <input type="text" onChange={(e) => this.handleUsernameChange(e.target.value)} value={this.state.username} placeholder="Username" />
        <br />
        Password: <input type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} value={this.state.password} placeholder="Password" />
        <br />
        Profile Picture <input type="file" onChange={(e) => this.handlePhotoUpload(e.target.files[0])} />
      </div>
    )
  }
}

export default Register;