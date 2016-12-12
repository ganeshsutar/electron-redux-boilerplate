import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers/index.jsx';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const middleware = applyMiddleware(routerMiddleware(hashHistory), promise(), thunk, logger())
const store = createStore(reducers, middleware);

export default store;
