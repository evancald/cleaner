import React, { Component } from 'react';
import './Dashboard.css';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      listings: []
    }
  }

  componentDidMount() {
    axios.get('/api/listings/all')
    .then((response) => {
      this.setState({ listings: response.data });
    })
  }

  render() {
    const listings = this.state.listings.map((listing, i) => {
      return (
        <div className="post" key={i}>
          <h3>{listing.title}</h3>
          <span> by {listing.username}</span>
          <br />
          <span>Price: ${listing.price}</span>
          <br />
          <span>Near {listing.location}</span>
        </div>
      )
    })
    return (
      <div className="dashboard-container">

        <div className="posts-container">
          {listings}
        </div>
      </div>
    )
  }
}

export default Dashboard;