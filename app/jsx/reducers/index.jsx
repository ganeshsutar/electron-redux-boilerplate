import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import simpleReducer from './simpleReducer.jsx';

const reducers = combineReducers({
  simpleReducer: simpleReducer,
  routing : routerReducer
});

export default reducers;
