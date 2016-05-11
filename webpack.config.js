var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
  'css',
  'postcss',
  'sass'
];

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, 'static/src/js/app.js')
  ],
  output: {
    path: path.join(__dirname, 'static/dist/'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        'presets': ['es2015']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=images/[hash].[ext]'
      ]
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', sassLoaders.join('!'))
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['ie >= 9']
    })
  ],
  sassLoader: {
    includePaths: [
      path.join(__dirname, 'static/src/styles'),
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ['static/src', 'node_modules']
  }
};
