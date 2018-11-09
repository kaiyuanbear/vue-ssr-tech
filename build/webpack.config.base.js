/**
 * static-data-shop: webpack.config.base.js
 * Description: webpack基本配置
 * Author: cdluzhichao
 * Contact: cdluzhichao@jd.com
 * Time: 2018/9/24
 */

const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

let config = {
    target: 'web',
    entry: path.resolve(__dirname, '../client/client-entry.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../public'),
        publicPath: "http://127.0.0.1:9527/public/" // 添加协议名和host是为了方便服务端调试
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'config': path.resolve(__dirname, '../client/config'),
            'views': path.resolve(__dirname, '../client/views')
        }
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: "pre"  // 在.(vue|js|jsx)对应的loader处理之前进行预处理
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'resources/[path][name].[hash:8].[ext]'
                    }
                }
            }
        ]
    }
};

module.exports = config;
