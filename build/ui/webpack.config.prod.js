'use strict';

const webpack = require('webpack');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const project = require('../../package.json');
const config = require('./webpack.config.base.js');
config.profile = false;

// Build output, which includes the hash.
// config.output.hash = true;
config.output.filename = 'auth0-user-import-export.ui.' + project.version + '.js';

// Development modules.
config.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    'fallback': 'style-loader',
    'use': 'css-loader!postcss-loader'
  })
});

// Webpack plugins.
config.plugins = config.plugins.concat([

  // Extract CSS to a different file, will require additional configuration.
  new ExtractTextPlugin({
    'filename': 'auth0-user-import-export.ui.' + project.version + '.css',
    allChunks: true
  }),

  // Separate the vender in a different file.
  new webpack.optimize.CommonsChunkPlugin({
    'name': 'vendors',
    'filename': 'auth0-user-import-export.ui.vendors.' + project.version + '.js'
  }),

  // Compress and uglify the output.
  new UglifyJsPlugin(),

  // Alternative to StatsWriterPlugin.
  new StatsWriterPlugin({
    filename: 'manifest.json',
    transform: function transformData(data) {
      const chunks = {
        app: data.assetsByChunkName.app[0],
        style: data.assetsByChunkName.app[1],
        vendors: data.assetsByChunkName.vendors[0]
      };
      return JSON.stringify(chunks);
    }
  })
]);

module.exports = config;
