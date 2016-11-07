import React from 'react';
import {connect} from 'react-redux';
import simpleActions from '../actions/simpleActions.jsx';

@connect((store)=>{
  return {
    message: store.simpleReducer.message,
    count: store.simpleReducer.count
  };
})
export default class App extends React.Component {
  constructor() {
    super();
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe() {
    simpleActions.clickMe();
    $.notify({
      title: 'Encounters',
      text: 'Got a response'
    }, {
      style: 'error-msg'
    });
  }

  componentWillReceiveProps(newProps){
    console.log(this.props);
    console.log(newProps);
  }

  render() {
    return (
      <div className="app">
        <h3>Hello World !!!</h3>
        <p>{this.props.message} Count: {this.props.count}</p>
        <button onClick={this.clickMe}>Click Me</button>
      </div>
    )
  }
}
