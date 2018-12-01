import React,  { Component } from 'react';
import './StepTwo.css';
import { connect } from 'react-redux';
import { updateTitle, updateDescription, updatePrice } from '../../../ducks/reducer';

class StepTwo extends Component {

  next = () => {
    this.props.history.push('/new/StepThree');
  }

  previous = () => {
    this.props.history.push('/new/StepOne');
  }

  render() {
    const { updateTitle, updateDescription, updatePrice } = this.props;
    return (
      <div className="form-container">
        <div>
          Title:
          <input type="text" onChange={(e) => updateTitle(e.target.value)} value={this.props.title} placeholder="Your listing title" />
          Description:
          <input type="text" onChange={(e) => updateDescription(e.target.value)} value={this.props.description} placeholder="Describe your listing. Details will make your listing more popular" />
          Price:
          <input type="number" onChange={(e) => updatePrice(e.target.value)} value={this.props.price} placeholder="Price in $" />
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
  const { title, description, price } = state;
  return {
    title,
    description,
    price
  }
}

export default connect(mapStateToProps, { updateTitle, updateDescription, updatePrice })(StepTwo);