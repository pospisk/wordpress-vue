module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_partials/_constants.scss";`,
      },
    },
  },
};
