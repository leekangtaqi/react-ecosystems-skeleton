'use strict';
require("babel-polyfill");
require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3', 'react']
});

//client deps
import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from '../client/routes';
import composeRoot from '../client/config/root';
import configureStore from '../client/config/store';

//server-side deps
import koa from 'koa';
import koaRouterCreator from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import mount from 'koa-mount';
import fs from 'fs';
import co from 'co';
import Promise from 'bluebird';

const readFile = co.wrap(fs.readFile);
let matchThunk = Promise.promisify(match);
let app = koa();
let router = koaRouterCreator();

app.use(views(path.join(__dirname, './views'), { extension: 'html', map: { html: 'swig' }}));

app.use(mount('/public', serve(path.join(__dirname, '../public'), {gzip: true})));

// for production env and server side support
app.use(function*(next){
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    let data = { routes, location: this.path }
    let { code, payload } = yield RouteMatchHandler(data);
    switch(code){
      case 500:
        this.status = code;
        this.body = `Internal Server Error ${payload}`;
        break;
      case 301:
        this.status = code;
        this.redirect(payload);
        break;
      case 200:
        this.status = code; 
        yield this.render('index', { html: payload.html, state: payload.state });
        break;
      case 404:
        this.status = code;
        this.body = payload;
        break;
    }
})

function RouteMatchHandler(data){
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

app.use(router.routes()).use(router.allowedMethods());

app.listen(3030, () => {
  console.warn(`[system]: application server is already startup on
    ip: localhost, 
    port: 3030, 
    env: ${process.env.NODE_ENV}
  `)
})

// start a webpack-dev-server with config
if(process.env.NODE_ENV === 'development'){
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let config = require('../webpack.config.js');

  let webpackDevServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: path.join(__dirname, '../client'),
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {colors: true},
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      "/api/*": "http://localhost:" + config.devServer.port,
      "/config/*": "http://localhost:" + config.devServer.port
    }
  }).listen(config.devServer.port, config.devServer.host, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(`[system]: Webpack Dev Server is startup, Listening at ${config.devServer.host || 'localhost'}:${config.devServer.port}`);
  });  
}