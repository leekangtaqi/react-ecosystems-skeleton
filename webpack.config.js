var webpack = require('webpack');
var path = require('path');

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
            }
        ]
    }
};

let mixedConfig = mixin(config, require(`./client/config/webpack.${refineEnv(env)}.config`));

module.exports = mixedConfig;

function mixin(t, s){
    for(let p in s){
        t[p] = s[p];
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