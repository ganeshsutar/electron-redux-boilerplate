import store from '../store.jsx';

var actions = {};
actions.clickMe = () => {
  store.dispatch({
    type: 'SIMPLE_ACTION',
    payload: {
      message: 'Hello World'
    }
  });
};

export default actions;
