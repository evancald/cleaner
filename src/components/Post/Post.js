import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';

class Post extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    const { postid } = this.props.match.params;
    axios.get(`/api/listings/${postid}`)
    .then(response => {
      const { type, title, description, username:author, price, address, city, usstate, zip } = response.data[0];
      this.setState({
        author,
        type,
        title,
        description,
        price,
        address,
        city,
        usstate,
        zip
      })
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
    const { type, title, description, author, price, address, city, usstate, zip } = this.state;
    return (
      <div className="post-container">
        <p>Type: {type}</p>
        <h2>{title} by {author}</h2>
        <p>{description}</p>
        <p>Price: ${price} </p>
        <div>
          Complete this listing at {address} {city}, {usstate} {zip}
        </div>
        <div>
          <button onClick={this.takeJob}>Take this gig!</button>
        </div>
      </div>
    )
  }
}

export default Post;