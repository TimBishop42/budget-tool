const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        bundle: [
            './src/index.js'
        ]
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(gif|svg|jpg|woff|woff2|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname +  '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    port:8081,
    proxy: {
        '/api/**': {
          target: 'http://localhost:8080',
          secure: false,
          changeOrigin: true
        }
      }
  }
};