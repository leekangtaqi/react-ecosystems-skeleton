import _ from 'lodash';
import ReactDOM from 'react-dom';
import configureStore, { sagaMiddleware } from './config/store';
import composeInitData from './config/data';
import composeRoot from './config/root';
import { browserHistory } from 'react-router';
import { routes } from './routes';
import { fromJS } from 'immutable';
import rootSagaAndModuleContext from './registerSagas';

let initalState = window.__INITIAL_STATE__;
if(initalState){
    composeInitData(initalState, configureStore());
}

let store = configureStore(initalState);

let test = sagaMiddleware.run(rootSagaAndModuleContext.rootSaga);

test.done.then(t => {
    console.error(t);
}).catch(e => {
    console.error(e);
})

let { root, history } = composeRoot(store, browserHistory, routes);

history.listen(location => {
    
});

ReactDOM.render(
    root,
    document.getElementById('app')
);