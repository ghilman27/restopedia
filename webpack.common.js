const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoWebpackPlugin = require('cssnano-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css|\.s(c|a)ss$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        { 
          from: "./src/manifest.json",
          to: "./manifest.json"
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CssnanoWebpackPlugin({
      sourceMap: true
    }),
    new Dotenv(),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/worker.js",
      swDest: "worker.js",
  }),
  ],
};
