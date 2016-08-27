let webpack = require('webpack');
let path = require('path');
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

let config = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot', 
                    'babel?plugins[]=transform-decorators-legacy,presets[]=es2015,presets[]=stage-0,presets[]=react'
                ],
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    }
};

let conf = deepMixin(config, require(`./client/config/webpack.${refineEnv(env)}.config`));

module.exports = conf;

/**
 * helpers
 */
function deepMixin(t, s){
    for(let p in s){
        if(t.hasOwnProperty(p)){
            if(Array.isArray(t[p])){
                t[p] = [...s[p], ...t[p]];
            }else if(typeof t[p] === 'object'){
                deepMixin(t[p], s[p])
            }
        }else{
            t[p] = s[p];
        }
    }
    return t;
}

function refineEnv(env){
    switch(env){
        case 'production':
            return 'prd';
        case 'development':
            return 'dev';
        case 'test':
            return 'tst';
    }
}