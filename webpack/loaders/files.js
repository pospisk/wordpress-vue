module.exports = {
  test: /\.(png|svg|jpg|gif|pdf)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "img",
        publicPath: "/wp-content/themes/pospisk/dist/img",
      },
    },
  ],
};
