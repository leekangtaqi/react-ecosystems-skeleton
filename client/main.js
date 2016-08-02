import _ from 'lodash';
import ReactDOM from 'react-dom';
import configureStore from './config/store';
import composeInitData from './config/data';
import composeRoot from './config/root';
import { browserHistory } from 'react-router';
import { getRoutes } from './routes';
import { fromJS } from 'immutable';
import { rootSaga } from './registerSagas';

let initalState = window.__INITIAL_STATE__;
if(initalState){
    composeInitData(initalState, configureStore());
}

let store = configureStore(initalState);

let rootTask = store.runSaga(rootSaga);

let { root } = composeRoot(store, browserHistory, getRoutes(store));

ReactDOM.render(
    root,
    document.getElementById('app')
);