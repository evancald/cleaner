import React, { Component } from 'react';
import './StepFour.css';
import { connect } from 'react-redux';
import { updatePhotos } from '../../../ducks/reducer';
import DropZone from 'react-dropzone';
import axios from 'axios';

class StepFour extends Component {

  handleDrop = files => {
    const photoURLs = [];
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "iqofzohb");
      formData.append("api_key", "184123142513397");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios.post("https://api.cloudinary.com/v1_1/evancald/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then(response => {
      photoURLs.push(response.data.secure_url);
      console.log(photoURLs);
    })
  })
  axios.all(uploaders).then(() => {
    const { updatePhotos } = this.props;
    updatePhotos(photoURLs);
    window.alert("upload successful! Click 'Proceed to Review' to review and confirm your listing");
  })
}

next = () => {
  this.props.history.push('/new/review');
}

previous = () => {
  this.props.history.push('/new/StepThree');
}

  render() {
    return (
      <div className="form-container">
        <div>
          <DropZone
            onDrop={this.handleDrop}
            multiple accept="image/*"
            >
            <p>Drop photos of your listing here!</p>
          </DropZone>
        </div>
        <button onClick={this.next}>Proceed to Review</button>
        <button onClick={this.previous}>Previous</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { photos } = state;
  return {
    photos
  }
}

export default connect(mapStateToProps, { updatePhotos })(StepFour);