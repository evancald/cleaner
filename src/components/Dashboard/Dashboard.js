import React, { Component } from 'react';
import './Dashboard.css';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      listings: [],
      searchText: '',
      searchCity: ''
    }
  }

  componentDidMount() {
    this.resetListings();
  }

  resetListings = () => {
    axios.get('/api/listings/all')
    .then(response => {
      this.setState({ listings: response.data });
    })
  }

  resetSearch = () => {
    this.resetListings();
    this.setState({
      searchText: '',
      searchCity: ''
    })
  }

  updateSearchText = (searchText) => {
    this.setState({searchText});
  }

  updateSearchCity = (searchCity) => {
    this.setState({searchCity});
  }

  performSearch = () => {
    axios.get(`/api/searchPosts?searchText=${this.state.searchText}&city=${this.state.searchCity}`)
    .then(response => {
      this.setState({ listings: response.data });
    })
  }

  render() {
    const listings = this.state.listings.map((listing, i) => {
      return (
        <div className="post" key={i} onClick={() => this.props.history.push(`/post/${listing.id}`)} style={ { backgroundImage: `url(${listing.default_photo})`} }>
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
          <input type="text" onChange={(e) => this.updateSearchText(e.target.value)} value={this.state.searchText} placeholder="Keyword"></input>
          <br />
          <input type="text" onChange={(e) => this.updateSearchCity(e.target.value)} value={this.state.searchCity} placeholder="City"></input>
          <button onClick={() => this.performSearch()}>Search</button>
          <button onClick={this.resetSearch}>Reset</button>
        </div>

        <div className="posts-container">
          {listings}
        </div>

      </div>
    )
  }
}

export default Dashboard;