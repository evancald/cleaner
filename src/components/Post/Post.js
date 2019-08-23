import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      photos: [],
      message: ''
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

  updateMessage = (message) => {
    this.setState({message});
  }

  sendMessage = () => {
    axios.post('/api/sendMessage', {
      toEmail: this.state.post.email,
      message: this.state.message,
      postTitle: this.state.post.title
    })
    .then(response => {
      if (response.data === 'success') {
        window.alert('message sent successfully');
        this.setState({message: ''});
      } else {
        window.alert('Sorry, something went wrong. Please try again.');
      }
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
        <div key={i} className="module">
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
        <div className="post-response-options">
          { this.state.post.worker
          ? 
            <p>Sorry, this job is taken!</p> 
          :           
            <div>
              <textarea className="essay-box" type="text" cols="60" rows="5" onChange={(e) => this.updateMessage(e.target.value)} value={this.state.message}></textarea>
              <button onClick={this.sendMessage}>Send Message</button>
            </div> 
          }
          </div>
        <div className="grid">
          {photos}
        </div>
      </div>
    )
  }
}

export default Post;