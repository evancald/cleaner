import React, { Component } from 'react';
import './StepOne.css';
import { connect } from 'react-redux';
import { updateType } from '../../../ducks/reducer';

class StepOne extends Component {

  next = () => {
    this.props.history.push('/new/stepTwo');
  }

  render() {
    const { updateType } = this.props;
    return (
      <div className="form-container">
        <div>What type of listing are you making?</div>
        <div>
          <button onClick={() => updateType('job')}>Help Wanted</button>
        </div>
        <div>
          <button onClick={() => updateType('service')}>Service Provided</button>
        </div>
        <div>
          <button onClick={this.next}>Next</button>
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