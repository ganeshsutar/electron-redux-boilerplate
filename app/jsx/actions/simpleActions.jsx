import store from '../store.jsx';
import db from '../models/index.jsx';

var actions = {};
actions.clickMe = () => {
  store.dispatch({
    type: 'SIMPLE_ACTION',
    payload: {
      message: 'Hello World'
    }
  });
};

actions.getTasks = () => {
  return store.dispatch({
    type: 'GET_TASKS',
    payload: db.Task.findAll({raw: true})
  });
};

export default actions;
