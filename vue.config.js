module.exports = {
  publicPath: "./",
  outputDir: "docs",
  // assetsDir: 'static' + process.env.npm_package_version,
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
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}