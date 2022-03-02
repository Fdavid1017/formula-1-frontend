module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/scss/variables.scss";
        @import "~@/scss/mixins.scss";
        @import "~@/scss/global.scss";
        @import "~@/fonts/fonts.scss";
        `,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.geojson$/,
          loader: "json-loader",
        },
      ],
    },
  },
};
