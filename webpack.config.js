const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  devServer: {port: 3000},
  devtool: 'eval',
  watch: true,
  entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   exclude: /node-modules/,
      //   loader: 'file-loader',
      //   options: {
      //     publicPath: 'assets',
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'src', 'index.html'),
    })
  ],
};
