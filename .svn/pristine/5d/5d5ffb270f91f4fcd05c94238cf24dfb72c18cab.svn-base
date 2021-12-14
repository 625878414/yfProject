const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir)
};
const debug = process.env.NODE_ENV === 'development';
const BASE_URL = !debug ?
    '/dist/' :
    '/';
module.exports = {
    publicPath: BASE_URL,
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.resolve.extensions
            .merge(['.js', '.jsx', '.vue', '.json'])
            .end()
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "...";
                return args
            })
    },
    devServer: {
        host: "0.0.0.0",
        useLocalIp: true,
        port: "8000",
        proxy: {
            '/zuul': {
                target: debug ? 'http://192.168.110.143:30080' : '线上网关',
                ws: true,
                changeOrigin: true,
                pathRewrite: { //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
                    '^/zuul': ''
                }
            }
        },
    }
};