import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './containers/app.jsx';
import Store from './store.jsx';

const history = syncHistoryWithStore(hashHistory, Store);

ReactDom.render(
  (
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
