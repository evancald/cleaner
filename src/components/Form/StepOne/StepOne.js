import React, { Component } from 'react';
import './StepOne.css';
import { connect } from 'react-redux';
import { updateType } from '../../../ducks/reducer';

class StepOne extends Component {

  next = (type) => {
    const { updateType } = this.props;
    updateType(type);
    this.props.history.push('/new/StepTwo');
  }

  render() {
    return (
      <div className="form-container">
        <div>What type of listing are you making?</div>
        <div>
          <button onClick={() => this.next('job')}>Help Wanted</button>
        </div>
        <div>
          <button onClick={() => this.next('service')}>Service Provided</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { type } = state;
  return {
    type
  }
}

export default connect(mapStateToProps, { updateType })(StepOne);