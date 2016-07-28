'use strict';
require("babel-polyfill");
require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3', 'react']
});

import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from '../client/routes';

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

app.use(function*(next){
  console.warn(this.path)
  yield next;
})

// for production env and server side support
app.use(function*(next){
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    let data = { routes, location: this.path }
    
    match(data, (error, redirectLocation, renderProps) => {
      if (error) {
        this.status = 500;
        this.body = `Internal Server Error ${err}`;
      } else if (redirectLocation) {
          this.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
          // You can also check renderProps.components or renderProps.routes for
          // your "not found" component or route respectively, and send a 404 as
          // below, if you're using a catch-all route.
          console.warn(renderProps);
          this.status = 200;
          this.body = renderToString(<RouterContext {...renderProps} />);
      } else {
        this.status = 404;
        this.body = 'Not found';
      }
    })
})

app.use(views(path.join(__dirname, './views'), { map: { html: 'swig' }}));

app.use(mount('/public', serve(path.join(__dirname, '../public'), {gzip: true})));

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