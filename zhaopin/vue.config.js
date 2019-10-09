module.exports = {
	lintOnSave: false,
	devServer: {
		host: '127.0.0.1',
		port: 1214,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9093',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}