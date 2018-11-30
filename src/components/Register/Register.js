import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const uploadImage = (file) => {
  return axios.post('/api/getSignedUrl', {
    filename: file.name,
    filetype: file.type
  })
  .then(res => {
    let options = {
      headers: {
        'Content-Type': file.type
      }
    }
    return axios.put(res.data.url, file, options)
    .then(res => {
      console.log('Image uploaded to:', res.config.url.match(/.*\?/)[0].slice(0,-1));
      return res.config.url.match(/.*\?/)[0].slice(0,-1);
    })
  })
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      profilePicture: null,
    }
  }

  componentDidMount() {
  }

  handleUsernameChange = (username) => {
    this.setState({username});
  }

  handlePasswordChange = (password) => {
    this.setState({password});
  }

  onDrop(accepted) {
    uploadImage(accepted[0])
    .then(url => {
      console.log('OnDropped to:', url);
      this.setState({profilePicture: url});
    })
  }

  render() {
    return (
      <div>
        Desired Username: <input type="text" onChange={(e) => this.handleUsernameChange(e.target.value)} value={this.state.username} placeholder="Username" />
        <br />
        Password: <input type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} value={this.state.password} placeholder="Password" />
        <br />
        <Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>
          Drop your profile picture here!
        </Dropzone>
      </div>
    )
  }
}

export default Register;