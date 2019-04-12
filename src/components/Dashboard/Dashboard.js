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
    document.addEventListener('keydown', this.enterHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterHandler);
  }

  enterHandler = (e) => {
    if (e.keyCode === 13) {
      this.performSearch();
    }
  }

  resetListings = () => {
    axios.get('api/listings/all')
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
    axios.get(`api/searchPosts?searchText=${this.state.searchText}&city=${this.state.searchCity}&type=${this.state.listingType}`)
    .then(response => {
      this.setState({ listings: response.data });
    })
  }

  render() {
    const listings = this.state.listings.map((listing, i) => {
      return (
        <div className="module" key={i} onClick={() => this.props.history.push(`/post/${listing.id}`)} style={ { backgroundImage: `url(${listing.default_photo})`} }>
          <div className="listing-overview">
            <div className="listing-bullet">{listing.title}</div>
            <div className="listing-bullet">${listing.price}</div>
            <div className="listing-bullet">{listing.city}, {listing.usstate}</div>
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