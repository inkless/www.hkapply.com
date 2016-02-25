var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, 'static/src/js/app.js')
  ],
  output: {
    path: path.join(__dirname, 'static/dist/js/'),
    filename: '[name].js',
    publicPath: '/static'
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
    }]
  }
};
