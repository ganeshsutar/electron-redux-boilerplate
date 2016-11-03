import React from 'react';
import {connect} from 'react-redux';
import simpleActions from '../actions/simpleActions.jsx';

@connect((store)=>{
  return {
    message: store.simpleReducer.message
  };
})
export default class App extends React.Component {
  constructor() {
    super();
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe() {
    simpleActions.clickMe();
  }

  render() {
    return (
      <div className="app">
        <h3>Hello World !!!</h3>
        <p>{this.props.message}</p>
        <button onClick={this.clickMe}>Click Me</button>
      </div>
    )
  }
}
