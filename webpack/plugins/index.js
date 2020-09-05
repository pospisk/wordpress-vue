const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

var path = require('path');
// var webpack = require('webpack');
var PrerenderSpaPlugin = require('prerender-spa-plugin'); // Here
var HtmlWebpackPlugin = require('html-webpack-plugin'); // And here

plugins = [
  require("./stylelint"),
  new webpack.ProvidePlugin({
    throttle: "lodash.throttle",
  }),

  new webpack.LoaderOptionsPlugin({ minimize: true }),
  new ExtractTextPlugin("styles.css"),
  new VueLoaderPlugin(),
];

if (process.env.NODE_ENV === "development") {
  plugins.push(require("./browser-sync"));
  plugins.push(require("./stylelint"));
}

module.exports = plugins;
