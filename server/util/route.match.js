import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { wrap } from 'co';
import { rootSaga } from '../../client/registerSagas';
import { END } from 'redux-saga';

export function RouteMatchHandler(data, store){
  return new Promise((resolve, reject) => {
    match(data, (error, redirectLocation, renderProps) => {
      if (error) {
        return resolve({
          code: 500,
          payload: error
        });
      } else if (redirectLocation) {
        let url = redirectLocation.pathname + redirectLocation.search;
        return resolve({
          code: 301,
          payload: url
        });
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        let { query, params, components, history } = renderProps;
        let rootTask = store.runSaga(rootSaga);
        let html = null; 
        //fetchData entry point
        wrap(execFetchDataEntryPoint)(components, { query, params, store, history })
          .then(() => {
            renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            )
            return store.dispatch(END);
          })
          .then(() => {
            html = renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            )
            return resolve({
              code: 200,
              payload: {html, state: store.getState()}
            });
          })
      } else {
        return resolve({
            code: 301,
            payload: 'NOT FOUND'
          });
      }
    })
  });
}

//helpers
function* execFetchDataEntryPoint(components, metadata){
  try{
    if(!components || !components.length){
      return;
    }
    let component = components[0].WrappedComponent ? components[0].WrappedComponent : components[0];
    if(component.fetchData){
      yield component.fetchData(metadata);
    }
    return yield execFetchDataEntryPoint(components.slice(1), metadata);
  }catch(err){
    console.error(err);
  }
}