import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUsername, updateProfilePicture, resetState } from '../../ducks/reducer';

class Nav extends Component {

  componentDidMount() {
    axios.get('/api/auth/me')
    .then((response) => {
      const { updateUsername, updateProfilePicture } = this.props;
      if (response.data) {
        updateUsername(response.data.username);
        updateProfilePicture(response.data.profile_pic);
      }
    })
    .catch(err => {
      console.log('error: ', err);
    })
  }

  myJobs = () => {
    this.props.history.push('/myJobs');
  }

  myListings = () => {
    this.props.history.push('/myListings');
  }

  logout = () => {
    axios.post('/api/auth/logout')
    .then(() => {
      const { resetState } = this.props;
      resetState();
      this.props.history.push('/');
    })
  }

  createNewListing = () => {
    this.props.history.push('/new/StepOne');
  }

  render() {
    if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/register' ) {
      return (
        <div className="nav-container">
          <img className="profile-picture" src={this.props.profilePicture} alt="user avatar" height="100px" width="100px" />
          <h3>{this.props.username}</h3>
          <button onClick={() => this.props.history.push('/dashboard')}>Dashboard</button>
          <button onClick={this.createNewListing}>New Listing</button>
          <button onClick={this.myJobs}>My Jobs</button>
          <button onClick={this.myListings}>My Listings</button>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  const { username, profilePicture } = state;
  return {
    username,
    profilePicture
  }
}

export default connect(mapStateToProps, { updateUsername, updateProfilePicture, resetState })(Nav);