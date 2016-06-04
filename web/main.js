import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { applyMiddleware, createStore, combineReducers, compose} from 'redux';
import { Router, Route, browserHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import {routes} from './routes';
import middlewares from './middlewares/index';
import reducers from './registerReducers';

const reducer = combineReducers({
    routing: routerReducer,
    ...reducers
});

const routeMw = routerMiddleware(browserHistory);

const store = compose(applyMiddleware(routeMw, ...(_.values(middlewares))))(createStore)(reducer);

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