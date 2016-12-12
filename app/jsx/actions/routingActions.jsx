import store from '../store.jsx';
import {push, replace} from 'react-router-redux';

var actions = {};

actions.goto = function(link) {
  store.dispatch(push(link));
};

actions.reload = function(link) {
  store.dispatch(replace(link));
};

export default actions;
