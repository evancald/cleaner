import React, { Component } from 'react';
import './Review.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearInputs } from '../../../ducks/reducer';


class Review extends Component {

  previous = () => {
    this.props.history.push('/new/StepFour');
  }

  submit = () => {
    const { type, title, description, price, address, city, usState, zip, photos } = this.props;
    axios.post('/api/listings/new', {
      type,
      title,
      description,
      price,
      address,
      city,
      usState,
      zip,
      default_photo: photos[0]
    })
    .then((response) => {
      const { id:postid } = response.data[0];
      //response.data[0].id will give you the id of the newly created post!
      photos.map(photo => {
        //axios post of photo url to photos table with the postid
        return axios.post('/api/addPhoto', {
          photo,
          postid
        })
      })
      const { clearInputs } = this.props;
      clearInputs();
      this.props.history.push('/dashboard');
    })
  }

  render() {
    const { type, title, description, price, address, city, usState, zip, photos } = this.props;
    const photosPreview = photos.map((photo, i) => {
      return (
      <div key={i}>
        <img src={photo} alt={i} height='100px' width='100px' />
      </div>
      )
    })
    return(
      <div className="form-container">
        <div>
          <h1>Review</h1>
          <span>Type: {type}</span>
          <span>Title: {title}</span>
          <span>Description: {description}</span>
          <span>Price: ${price}</span>
          <span>Address: {address}</span>
          <span>City: {city}</span>
          <span>State: {usState}</span>
          <span>Zip: {zip}</span>
        </div>
        <div>
          {photosPreview}
        </div>
        <div>
          <button onClick={this.previous}>Previous</button>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { type, title, description, price, address, city, usState, zip, photos } = state;
  return {
    type,
    title,
    description,
    price,
    address,
    city,
    usState,
    zip,
    photos
  }
}

export default connect(mapStateToProps, { clearInputs })(Review);