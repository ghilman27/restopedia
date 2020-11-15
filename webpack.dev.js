const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        // uncomment this to view webpack-dev-server on devices with the same network
        // host: 'your-ip-address',
        // port: 8080,
        // disableHostCheck: true,
    },
});
