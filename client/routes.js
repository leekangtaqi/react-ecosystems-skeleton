import React from 'react';
import { Route } from 'react-router';

import { UserIsAuthenticated } from './auth'; 

import App from './todo/TodoList';
import Login from './login/Login';
import Nest1 from './todo/Nest1';
import Nest2 from './todo/Nest2';
import Nest3 from './todo/Nest3';

export const getRoutes = store => {
    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);
    return (
        <Route path="/" component={App}>
            <Route path="login" component={Login}/>
            <Route path="nest1" component={UserIsAuthenticated(Nest1)} onEnter={connect(UserIsAuthenticated.onEnter)}/>
            <Route path="nest2" component={Nest2}/>
            <Route path="nest3" component={Nest3}/>
        </Route>
    )
}