import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory} from 'react-router';
import { routes } from './routes';
import configureStore from './config/store';

var store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => {
    console.log(location);
});

let root =
    <Provider store={store}>
        <Router routes={routes} history={history}></Router>
    </Provider>;

ReactDOM.render(
    root,
    document.getElementById('app')
);