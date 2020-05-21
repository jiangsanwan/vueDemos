module.exports = {
    lintOnSave: false,
    publicPath: './',
    outputDir: 'data_statistics',
    devServer: {// 开发环境使用
        port: 1314,
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:1413',// 开发环境
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}