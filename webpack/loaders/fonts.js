module.exports = {
  test: /\.(woff|woff2|eot|ttf)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath: "fonts",
      publicPath: "/wp-content/themes/pospisk/dist/fonts"
    },
  },
};
