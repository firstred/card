const webpack = require('webpack');
const _ = require('underscore');

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }),
];

const baseConfig = {
  resolve: {
    extensions: [
      '.js',
      '.coffee',
      '.scss',
    ],
  },
  entry: './src/coffee/card.coffee',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'card.js',
    library: 'card',
    libraryTarget: 'var',
  },
  module: {
    loaders: [
      { test: /\.scss/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.json/, loader: 'json-loader' },
      { test: /\.coffee$/, loader: 'coffee-loader' },
    ],
  },
  plugins,
};

const jQueryConfig = _.defaults(
  {
    entry: './src/coffee/jquery.card.coffee',
    output: {
      path: __dirname + '/dist/',
      filename: 'jquery.card.js',
      library: 'card',
      libraryTarget: 'var',
    },
    externals: {
      jquery: 'jQuery',
    },
    plugins,
  },
  baseConfig,
);

module.exports = [
  baseConfig,
  jQueryConfig,
];
