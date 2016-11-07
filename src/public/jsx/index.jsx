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

$.notify.addStyle('info-msg', {
  html: '<div class="notify-div"><span class="glyphicon glyphicon-info-sign"></span><div class="notify-text"><div class="title"><span data-notify-html="title" /></div><span data-notify-html="text" /></div></div>'
});

$.notify.addStyle('error-msg', {
  html: '<div class="notify-div"><span class="glyphicon glyphicon-remove-sign"></span><div class="notify-text"><div class="title"><span data-notify-html="title" /></div><span data-notify-html="text" /></div></div>'
});
