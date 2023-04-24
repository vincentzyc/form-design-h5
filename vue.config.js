const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,

  configureWebpack: {
    // 以下库使用cdn，不会被打包
    externals: process.env.NODE_ENV === 'production' ? {
      "vue": "Vue",
    } : {}
  },

  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  devServer: {
    port: 9010,
  }
});