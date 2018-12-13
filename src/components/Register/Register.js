import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { updateUsername, updatePassword, updateProfilePicture } from '../../ducks/reducer';

class Register extends Component {

  handleDrop = files => {
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "iqofzohb");
      formData.append("api_key", "184123142513397");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios.post("https://api.cloudinary.com/v1_1/evancald/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const { updateProfilePicture } = this.props;
        updateProfilePicture(response.data.secure_url);
      })
    });
    axios.all(uploaders).then(() => {
      window.alert("upload successful! Click 'Register' to confirm your registration");
    })
  }

  register = () => {
    const { username, password, profilePicture } = this.props;
    axios.post('/api/auth/register', {
      username,
      password,
      profilePicture
    }).then(() => {
      window.alert('Thanks for joining Cleaner! Please login using your new account');
      this.props.history.push('/');
    })
  }

  render() {
    const { updateUsername, updatePassword } = this.props;
    const { username, password } = this.props;
    return (
        <div className="center-form">
        <div>
          Desired Username: <input type="text" onChange={(e) => updateUsername(e.target.value)} value={username} placeholder="Username" />
        </div>
        <div>
          Password: <input type="password" onChange={(e) => updatePassword(e.target.value)} value={password} placeholder="Password" />
        </div>
          <br />
          <Dropzone onDrop={ this.handleDrop } multiple accept="image/*" >
            <p> 
              Drop your profile picture here, or click to upload.
            </p>
          </Dropzone>
        <div>
          { this.props.profilePicture && this.props.username && this.props.password ? 
          <div> 
            <button onClick={this.register}>Register</button> 
          </div> : 
          <div>
            <p>Please complete all fields before continuing</p>
          </div> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { username, password, profilePicture } = state;
  return {
    username,
    password,
    profilePicture
  }
}

export default connect(mapStateToProps, { updateUsername, updatePassword, updateProfilePicture })(Register);