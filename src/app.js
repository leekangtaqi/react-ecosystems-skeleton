'use strict';

require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3', 'react']
});
require("babel-polyfill");

var React = require('react');
var ReactDomServer = require('react-dom/server');
var renderToString = ReactDomServer.renderToString;
var ReactRouter = require('react-router')
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;
var routes = require('../web/routes');

var app = require('express')();

app.use((req, res)=>{
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    let data = { routes, location: req.url }

    match(data, (error, redirectLocation, renderProps)=>{
        console.log(redirectLocation)
        console.log(renderProps)
        if (error) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            req.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.
            res.end(renderToString(<RouterContext {...renderProps} />));
        } else {
            res.status(404).end('Not found');
        }
    })
})

app.listen(3030)