'use strict'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  /**
   * Entry point for webpack.
   *
   * ref: https://webpack.js.org/concepts/entry-points
   */
  entry: {
    app: ['./resources/assets/js/app.js', './resources/assets/sass/app.scss']
  },

  /**
   * Configuring the output configuration options tell webpack
   * how to write the compiled files to disk.
   *
   * Note that, while there can be multiple entry points,
   * only one output configuration is specified.
   *
   * ref: https://webpack.js.org/concepts/output
   */
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].js'
  },

  /**
   * Loaders are transformations that are applied on the source
   * code of a module. They allow you to pre-process files
   * as you import or “load” them.
   *
   * ref: https://webpack.js.org/concepts/modules
   * ref: https://webpack.js.org/concepts/loaders
   */
  module: {
    rules: [
      // Sass
      {
        test: /\.s[ac]ss$/, use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        exclude: /images|img/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },

  /**
   * Plugins are the backbone of webpack. webpack itself is built
   * on the same plugin system that you use in your
   * webpack configuration!
   *
   * They also serve the purpose of doing anything
   * else that a loader cannot do.
   *
   * ref: https://webpack.js.org/concepts/plugins
   */
  plugins: [
    new CopyWebpackPlugin([
      { from: './resources/assets/copy', to: './' }
    ]),

    new ExtractTextPlugin('css/[name].css'),
  ],
}
