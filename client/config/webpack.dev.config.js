var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'babel-regenerator-runtime',
        'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
        'webpack/hot/only-dev-server',
        './client/main.js'
    ],
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, '../'),
        publicPath: "http://0.0.0.0:8080/client/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        hot: true
    }
};

