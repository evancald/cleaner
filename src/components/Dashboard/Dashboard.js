import React, { Component } from 'react';
import './Dashboard.css';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      listings: [],
      searchText: ''
    }
  }

  componentDidMount() {
    axios.get('/api/listings/all')
    .then((response) => {
      this.setState({ listings: response.data });
    })
  }

  updateSearchText = (searchText) => {
    this.setState({searchText});
  }

  performSearch = () => {
    axios.get(`/api/listings/search?searchText=${this.state.searchText}`)
    .then(response => {
      this.setState({ listings: response.data });
    })
  }

  render() {
    const listings = this.state.listings.map((listing, i) => {
      return (
        <div className="post" key={i} onClick={() => this.props.history.push(`/post/${listing.id}`)}>
          <h3>{listing.title}</h3>
          <span> by {listing.username}</span>
          <br />
          <span>Price: ${listing.price}</span>
          <br />
          <span>Near {listing.city}</span>
        </div>
      )
    })
    return (
      <div className="dashboard-container">
        
        <div className="search-bar">
          <input type="text" onChange={(e) => this.updateSearchText(e.target.value)} value={this.state.searchText} placeholder="Search"></input>
          <button onClick={() => this.performSearch()}>Search</button>
          <button>Reset</button>
        </div>

        <div className="posts-container">
          {listings}
        </div>

      </div>
    )
  }
}

export default Dashboard;