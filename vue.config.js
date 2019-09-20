module.exports = {
  publicPath: "./",
  outputDir: "docs",
	productionSourceMap: false,

	devServer: {
		port: 3000,
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