import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    const { postid } = this.props.match.params;
    axios.get(`/api/listings/${postid}`)
    .then(response => {
      this.setState({post: response.data[0]})
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
      </div>
    )
  }
}

export default Post;