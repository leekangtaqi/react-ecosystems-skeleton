import _ from 'lodash';
import ReactDOM from 'react-dom';
import configureStore from './config/store';
import composeInitData from './config/data';
import composeRoot from './config/root';
import { browserHistory } from 'react-router';
import { routes } from './routes';
import { fromJS } from 'immutable';

let initalState = window.__INITIAL_STATE__;
if(initalState){
    initalState = composeInitData(initalState, configureStore());
}

let store = configureStore(initalState);
let { root, history } = composeRoot(store, browserHistory, routes);

history.listen(location => {
    console.log(location);
});

ReactDOM.render(
    root,
    document.getElementById('app')
);