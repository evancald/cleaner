import React, { Component } from 'react';
import './MyListings.css';
import axios from 'axios';

class MyListings extends Component {
  constructor() {
    super();
    this.state = {
      myListings: []
    }
  }

  componentDidMount() {
    axios.get('/api/myListings')
    .then(response => {
      this.setState({myListings: response.data})
    })
  }

  deleteListing = (id) => {
    axios.delete(`/api/listings/${id}`)
    .then(() => {
      this.componentDidMount();
    })
  }

  render() {
    const myListings = this.state.myListings.map((listing, i) => {
      return (
        <div key={i}>
          <h2>{listing.title}</h2>
          <button onClick={() => {this.props.history.push(`/post/${listing.id}`)}}>View Listing</button>
          <button onClick={() => this.deleteListing(listing.id)}>Delete</button>
        </div>
      )
    })
    return(
      <div className="listings-container">
        {myListings}
      </div>
    )
  }
}

export default MyListings;