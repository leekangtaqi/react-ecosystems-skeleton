import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import configureStore from '../../client/config/store';
import React from 'react';

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
          let store = configureStore();
          let html = renderToString(
            <Provider store={store}>
              {<RouterContext {...renderProps} />}
            </Provider>
          );
          return resolve({
            code: 200,
            payload: {html, state: store.getState()}
          });
      } else {
        return resolve({
            code: 301,
            payload: 'NOT FOUND'
          });
      }
    })
  });
}