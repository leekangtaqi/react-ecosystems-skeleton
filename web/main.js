import React from 'react';
import ReactDOM from 'react-dom';
import App from './todo/TodoList';
import Nest1 from './todo/Nest1';
import Nest2 from './todo/Nest2';
import Nest3 from './todo/Nest3';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { applyMiddleware, createStore, combineReducers, compose} from 'redux'
import { Router, Route, hashHistory, browserHistory} from 'react-router';
import { createHistory } from 'history';
import { todos } from './todo/todo.reducers';
import { routerMiddleware } from 'react-router-redux'

const reducer = combineReducers({
    routing: routerReducer,
    todos
});

const routes = (
    <Route path="/" component={App}>
        <Route path="nest1" component={Nest1}/>
        <Route path="nest2" component={Nest2}/>
        <Route path="nest3" component={Nest3}/>
    </Route>
)

const routeMw = routerMiddleware(browserHistory);

const store = compose(applyMiddleware(routeMw))(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => {
    console.log(location);
});

let root = (
    <Provider store={store}>
        <Router routes={routes} history={history}>
        </Router>
    </Provider>
)

ReactDOM.render(
    root,
    document.getElementById('app')
);