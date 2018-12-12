import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      listings: [],
      searchText: '',
      searchCity: '',
      listingType: 'all'
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
      searchCity: '',
      listingType: 'all' 
    })
  }

  updateSearchText = (searchText) => {
    this.setState({searchText});
  }

  updateSearchCity = (searchCity) => {
    this.setState({searchCity});
  }

  updateListingType = (listingType) => {
    this.setState({listingType})
  }

  performSearch = () => {
    axios.get(`/api/searchPosts?searchText=${this.state.searchText}&city=${this.state.searchCity}&type=${this.state.listingType}`)
    .then(response => {
      this.setState({ listings: response.data });
    })
  }

  render() {
    const listings = this.state.listings.map((listing, i) => {
      return (
        <div className="module" key={i} onClick={() => this.props.history.push(`/post/${listing.id}`)} style={ { backgroundImage: `url(${listing.default_photo})`} }>
          <div className="listing-content">
            <h3>{listing.title}</h3>
            <span> by {listing.username}</span>
            <br />
            <span>Price: ${listing.price}</span>
            <br />
            <span>Near {listing.city}</span>
          </div>
        </div>
      )
    })
    return (
      <div className="dashboard">
        
        <div className="search-bar">
          <select id="type" onChange={(e) => this.updateListingType(e.target.value)} value={this.state.listingType}>
            <option value="all">All</option>
            <option value="job">Jobs Only</option>
            <option value="service">Services Only</option>
          </select>
          <input type="text" onChange={(e) => this.updateSearchText(e.target.value)} value={this.state.searchText} placeholder="Keyword"></input>
          <br />
          <input type="text" onChange={(e) => this.updateSearchCity(e.target.value)} value={this.state.searchCity} placeholder="City"></input>
          <button onClick={() => this.performSearch()}>Search</button>
          <button onClick={this.resetSearch}>Reset</button>
        </div>

        <div className="grid">
          {listings}
        </div>

      </div>
    )
  }
}

export default Dashboard;