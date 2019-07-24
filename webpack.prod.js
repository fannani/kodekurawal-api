const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge.smart(common, {
  entry: ['./app/app.jsx'],
  mode: 'production',
  devtool: 'source-map',
});
