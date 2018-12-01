import React, { Component } from 'react';
import './StepThree.css';
import { connect } from 'react-redux';
import { updateAddress, updateCity, updateUsState, updateZip } from '../../../ducks/reducer';

class StepThree extends Component {

  next = () => {
    this.props.history.push('/new/review');
  }

  previous = () => {
    this.props.history.push('/new/StepTwo');
  }

  render() {
    const { updateAddress, updateCity, updateUsState, updateZip } = this.props;
    const { address, city, usState, zip } = this.props;
    return (
      <div className="form-container">
        <div>
          Address:
          <input type="text" onChange={(e) => updateAddress(e.target.value)} value={address} placeholder="Your address" />
          City:
          <input type="text" onChange={(e) => updateCity(e.target.value)} value={city} placeholder="Your city" />
          State:
          <input type="text" onChange={(e) => updateUsState(e.target.value)} value={usState}  placeholder="US State Abbreviation (for example, 'UT'" />
          Zip:
          <input type="number" onChange={(e) => updateZip(e.target.value)} value={zip} placeholder="5-digit Zip Code" />
        </div>
        <div>
          <button onClick={this.previous}>Previous</button>
          <button onClick={this.next}>Next</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { address, city, usState, zip } = state;
  return {
    address,
    city,
    usState,
    zip
  }
}

export default connect(mapStateToProps, { updateAddress, updateCity, updateUsState, updateZip })(StepThree);