var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SaveAssetsJson = require('assets-webpack-plugin');

var sassLoaders = [
  'css',
  'postcss',
  'sass'
];

module.exports = {
  entry: [
    path.join(__dirname, 'static/src/js/app.js')
  ],
  output: {
    path: path.join(__dirname, 'static/dist/'),
    filename: '[name]-[hash].min.js',
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
        'url?limit=8000&hash=sha512&digest=hex&name=images/[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new SaveAssetsJson({
      path: __dirname,
      filename: 'assets.json'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
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
