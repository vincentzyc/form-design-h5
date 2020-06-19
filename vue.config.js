module.exports = {
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  
  chainWebpack: config => {
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