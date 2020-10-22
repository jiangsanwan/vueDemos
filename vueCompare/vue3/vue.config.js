let proxyObj = {};
proxyObj['/api'] = {
    ws: false,
    target: 'http://localhost:1413/',
    changeOrigin: true,
    pathRewrite: {
        '/api': ''
    }
};
module.exports = {
    devServer: {
        host: 'localhost',
        port: 3333,
        proxy: proxyObj
    }
};