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
      this.setState({myJobs: response.data});
    })
  }

  render() {
    const myJobs = this.state.myJobs.map((job, i) => {
      return (
      <div key={i}>
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