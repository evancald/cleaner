import React, { Component } from 'react';
import './Review.css';
import axios from 'axios';
import { connect } from 'react-redux';


class Review extends Component {

  previous = () => {
    this.props.history.push('/new/StepThree');
  }

  submit = () => {
    const { type, title, description, price, address, city, usState, zip } = this.props;
    axios.post('/api/listings/new', {
      type,
      title,
      description,
      price,
      address,
      city,
      usState,
      zip
    })
    .then(() => {
      this.props.history.push('/dashboard');
    })
  }

  render() {
    const { type, title, description, price, address, city, usState, zip } = this.props;
    return(
      <div className="form-container">
        <h1>Review</h1>
        <span>Type: {type}</span>
        <span>Title: {title}</span>
        <span>Description: {description}</span>
        <span>Price: ${price}</span>
        <span>Address: {address}</span>
        <span>City: {city}</span>
        <span>State: {usState}</span>
        <span>Zip: {zip}</span>
        <div>
          <button onClick={this.previous}>Previous</button>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { type, title, description, price, address, city, usState, zip } = state;
  return {
    type,
    title,
    description,
    price,
    address,
    city,
    usState,
    zip
  }
}

export default connect(mapStateToProps)(Review);