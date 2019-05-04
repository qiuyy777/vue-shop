const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'production'


let pluginsConfig = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: 'my App',
        template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
]
if (!isDev) {
    pluginsConfig = pluginsConfig.concat(new MiniCssExtractPlugin({
        filename: "[name]_[contenthash].css",

    }))
}

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        //引入时可以省略后缀
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            //@就了代表了src文件夹所在路径
            '@': path.resolve('src'),
            'components': path.resolve('src/components'),
            'common': path.resolve('src/common'),
            'css': path.resolve('src/assets/css'),
            'images': path.resolve('src/assets/images'),
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    //使用MiniCssExtractPlugin.loader的同时不要使用style-loader或vue-style-loader
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: '/node_modules/',
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "images",
                        name: "[hash:base64:7].[ext]",

                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: "font"
                    }
                }]
            }
        ]
    },
    plugins: pluginsConfig,
}