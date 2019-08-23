import React, { Component } from 'react';
import axios from 'axios';


class MyJobs extends Component {
  constructor() {
    super();
    this.state = {
      myJobs: []
    }
  }

  componentDidMount() {
    axios.get('/api/myJobs')
    .then(response => {
      console.log(response.data);
      this.setState({myJobs: response.data});
    })
  }

  render() {
    const myJobs = this.state.myJobs.map((job, i) => {
      return (
      <div key={i} onClick={() => this.props.history.push(`/post/${job.id}`)} style={{cursor:'pointer'}}>
        <h3>
          {job.title}
        </h3>
      </div>
      )
    })
    return (
      <div>
        My Jobs:
        <hr />
        {myJobs}
      </div>
    )
  }
}

export default MyJobs;