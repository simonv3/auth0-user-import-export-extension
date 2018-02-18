const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  stats: false,

  // The application and the vendor libraries.
  entry: {
    app: path.resolve(__dirname, '../../client/app.jsx'),
    vendors: [
      'axios',
      'bluebird',
      'classnames',
      'history',
      'immutable',
      'jwt-decode',
      'lodash',
      'moment',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-loader-advanced',
      'react-router',
      'react-redux',
      'redux',
      'redux-form',
      'redux-thunk',
      'redux-logger',
      'redux-promise-middleware'
    ]
  },

  // Output directory.
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'bundle.js',
    publicPath: '/app/'
  },

  // Module configuration.
  resolve: {
    alias: {
      React: 'react'
    },
    modules: [
      "node_modules"
    ],
    extensions: [ '.json', '.js', '.jsx' ]
  },

  // Load all modules.
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../../node_modules/')
      },
      {
        test: /\.(png|ttf|svg|jpg|gif)/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|woff2|eot)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  // Default plugins.
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      Promise: 'imports?this=>global!exports?global.Promise!bluebird'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // Postcss configuration.
        postcss: () => {
          return [
            require('postcss-simple-vars')(),
            require('postcss-focus')(),
            require('autoprefixer')({
              browsers: [ 'last 2 versions', 'IE > 8' ]
            }),
            require('postcss-reporter')({
              clearMessages: true
            })
          ];
        }
      }
    })
  ],
};
