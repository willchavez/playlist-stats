var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/app/assets/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              importLoaders: 3,
            }
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: true,
            }
          },
          {
            loader: 'resolve-url-loader',
            query: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true,
              sourceMapContents: true,
            }
          }
        ]
      }
    ]
  },
};
