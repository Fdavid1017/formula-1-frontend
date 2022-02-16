module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/scss/variables.scss";
        @import "~@/scss/mixins.scss";
        @import "~@/fonts/fonts.scss";
        `,
      },
    },
  },
};
