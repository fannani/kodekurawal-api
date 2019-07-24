const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');

dotenv.config();

module.exports = {
  output: {
    publicPath: `${process.env.BASE_URL}js/`,
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/template.html',
      filename: '../index.html',
      title: 'kodekurawal',
    }),
    new DotenvWebpack({
      systemvars: true,
    }),
    new CopyPlugin([
      {
        from: 'app/assets/js/*',
        to: 'js',
        transformPath(targetPath, absolutePath) {
          return absolutePath.replace(/^.*[\\\/]/, '');
        },
      },
    ]),
  ],
};
