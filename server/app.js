'use strict';
require("babel-polyfill");
require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3', 'react']
});

import path from 'path';
import koa from 'koa';
import koaRouterCreator from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import mount from 'koa-mount';
import fs from 'fs';
import serverSide from './middlewares/server-side';

let app = koa();
let router = koaRouterCreator();

app.use(views(path.join(__dirname, './views'), { extension: 'html', map: { html: 'swig' }}));

app.use(mount('/public', serve(path.join(__dirname, '../public'), {gzip: true})));

// server side support
app.use(serverSide);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3030, () => {
  console.warn(`[system]: application server is already startup on
    ip: localhost, 
    port: 3030, 
    env: ${process.env.NODE_ENV}
  `)
})

// start a webpack-dev-server with config in development
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