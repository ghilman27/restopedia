const { merge } = require('webpack-merge');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
    //     new CompressionWebpackPlugin({
    //         filename: '[path].gz[query]',
    //         algorithm: 'gzip',
    //         test: /\.js$|\.css$|\.html$/,
    //         threshold: 10240,
    //         minRatio: 0.8,
    //     }),
    ],
});
