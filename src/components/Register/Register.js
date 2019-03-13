import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { updateUsername, updateEmail, updatePassword, updateConfirmPassword, updateProfilePicture } from '../../ducks/reducer';

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
    const { username, email, password, confirmPassword, profilePicture } = this.props;
    if (password !== confirmPassword) {
      window.alert('Your password confirmation does not match. Please try again')
    } else {
      axios.post('/api/auth/register', {
        username,
        email,
        password,
        profilePicture
      }).then(() => {
        window.alert('Thanks for joining Cleaner! Please login using your new account');
        this.props.history.push('/');
      })
    }
  }

  render() {
    const { updateUsername, updateEmail, updatePassword, updateConfirmPassword } = this.props;
    const { username, email, password, confirmPassword, profilePicture } = this.props;
    return (
        <div className="center-register">
          <div>
            Desired Username: <input type="text" onChange={(e) => updateUsername(e.target.value)} value={username} placeholder="Username" />
          </div>
          <div>
            Email: <input type="text" onChange={(e) => updateEmail(e.target.value)} value={email} placeholder="Email" />
          </div>
          <div>
            Password: <input type="password" onChange={(e) => updatePassword(e.target.value)} value={password} placeholder="Password" />
          </div>
          <div>
            Confirm Password: <input type="password" onChange={(e) => updateConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" />
          </div>
        
          <br />
          <Dropzone onDrop={ this.handleDrop } multiple accept="image/*" >
            <p> 
              Drop your profile picture here, or click to upload.
            </p>
          </Dropzone>
        <div>
          { username && email && password && confirmPassword && profilePicture ? 
          <div> 
            <button className="login-button" onClick={this.register}>Register</button> 
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
  const { username, email, password, confirmPassword, profilePicture } = state;
  return {
    username,
    email,
    password,
    confirmPassword,
    profilePicture
  }
}

export default connect(mapStateToProps, { updateUsername, updateEmail, updatePassword, updateConfirmPassword, updateProfilePicture })(Register);