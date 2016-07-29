import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { Router, Route, browserHistory} from 'react-router';
import middlewares from '../middlewares/index';
import reducerAndModuleContext from '../registerReducers';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import _ from 'lodash';

const reducer = combineReducers({
    routing: routerReducer,
    ...reducerAndModuleContext.reducers
});

const routeMw = routerMiddleware(browserHistory);
const sagaMw = createSagaMiddleware();

function configureStore(initialState={}) {
	const store = compose(applyMiddleware(sagaMw, routeMw, ...(_.values(middlewares))))(createStore)(reducer, initialState);
  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(reducerAndModuleContext.context, () => {
      store.replaceReducer(reducer);
    });
  }
  return store;
};
configureStore.sagaMiddleware = sagaMw;

export default configureStore;