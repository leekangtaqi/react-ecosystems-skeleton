import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import configureStore from '../../client/config/store';
import React from 'react';
import { wrap } from 'co';

export function RouteMatchHandler(data){
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
        let { query, params, components, history} = renderProps;
        let store = configureStore();
        //fetchData entry point
        wrap(getFetchDataEntryPoint)(components, { query, params, store, history })
          .then(() => {
            let html = renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            );
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
function* getFetchDataEntryPoint(components, metadata){
  if(!components || !components.length){
    return;
  }
  let component = components[0].WrappedComponent ? components[0].WrappedComponent : components[0];
  if(component.fetchData){
    yield component.fetchData(metadata);
  }
  return yield getFetchDataEntryPoint(components.slice(1), metadata);
}