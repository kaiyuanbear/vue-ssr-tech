/**
 * static-data-shop: webpack.config.base.js
 * Description: webpack基本配置
 * Author: cdluzhichao
 * Contact: cdluzhichao@jd.com
 * Time: 2018/9/24
 */

const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

let config = {
    target: 'web',
    entry: path.resolve(__dirname, '../src/index'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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