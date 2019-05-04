const webpack = require('webpack')
const path = require('path')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //告诉服务器从哪个目录中提供内容
        compress: true, //启用 gzip 压缩
        port: 3006, //端口号
        host: '0.0.0.0', //默认是 localhost。如果希望服务器外部可访问,则设置为0.0.0.0
        disableHostCheck: true,
        hot: true, //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
        proxy: { // proxy URLs to backend development server
            '/home': {
                target: 'http://localhost:5000'
            },
            '/home/*': {
                target: 'http://localhost:5000'
            },
            '/cart': {
                target: 'http://localhost:5000'
            },
            '/cart/*': {
                target: 'http://localhost:5000'
            },
            '/order': {
                target: 'http://localhost:5000'
            },
            '/order/*': {
                target: 'http://localhost:5000'
            },
            '/address': {
                target: 'http://localhost:5000'
            },
            '/address/*': {
                target: 'http://localhost:5000'
            },
            '/users/*': {
                target: 'http://localhost:5000'
            },
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), //清理文件夹
        new webpack.HotModuleReplacementPlugin(), //启用热替换模块
        new webpack.NamedModulesPlugin() //启用HMR时,插件将显示模块的相对路径
    ]
})