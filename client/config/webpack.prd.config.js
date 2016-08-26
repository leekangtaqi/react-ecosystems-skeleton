let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './client/main.js',
        './client/main.scss'
    ],
    module: {
        loaders: [
            { 
                test: /\.scss$/i, 
                loader: ExtractTextPlugin.extract(['css','sass'])
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../../dist/public'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin("style/style.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true
        }),
    ]
};

