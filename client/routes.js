var React = require('react');
var Route = require('react-router').Route;
import App from './todo/TodoList';
import Nest1 from './todo/Nest1';
import Nest2 from './todo/Nest2';
import Nest3 from './todo/Nest3';

export var routes =
    <Route path="/" component={App}>
        <Route path="nest1" component={Nest1}/>
        <Route path="nest2" component={Nest2}/>
        <Route path="nest3" component={Nest3}/>
    </Route>