import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      photos: []
    }
  }

  componentDidMount() {
    const { postid } = this.props.match.params;
    axios.get(`/api/listings/${postid}`)
    .then(response => {
      this.setState({post: response.data[0]});
    })
    axios.get(`/api/photos/${postid}`)
    .then(response => {
      this.setState({photos: response.data});
    })
  }

  takeJob = () => {
    const { postid } = this.props.match.params;
    axios.put('/api/listings/takeJob', {
      jobid: postid
    })
    .then(() => {
      this.props.history.push('/myJobs');
    })
  }

  render() {
    const { type, title, description, price, address, city, usstate, zip, username } = this.state.post;

    const photos = this.state.photos.map((photo, i) => {
      return (
        <div key={i}>
          <img src={photo.photo_url} alt={i} height='200px' width='200px' />
        </div>
      )
    });

    return (
      <div className="post-container">
        <p>Type: {type}</p>
        <h2>{title} by {username}</h2>
        <p>{description}</p>
        <p>Price: ${price} </p>
        <div>
          Complete this listing at {address} {city}, {usstate} {zip}
        </div>
        <div>
          { this.state.post.worker ? <p>Sorry, this job is taken!</p> : <button onClick={this.takeJob}>Take this gig!</button> }
        </div>
        <div>
          {photos}
        </div>
      </div>
    )
  }
}

export default Post;