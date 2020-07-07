module.exports = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'http://pospisk.local/wp-content/themes/pospisk/dist/img/[name].[ext]',
      },
    },
  ],
};
