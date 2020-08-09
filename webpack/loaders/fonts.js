module.exports = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  use: {
    loader: "file-loader",
    options: {
      name:
        "http://pospisk.local/wp-content/themes/pospisk/dist/fonts/[name].[ext]",
    },
  },
};
