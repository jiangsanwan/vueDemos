module.exports = {
	lintOnSave: false,
	devServer: {
		host: '127.0.0.1',
		port: 2222,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:2222',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}