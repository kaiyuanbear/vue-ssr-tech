const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config = merge(baseConfig, {
  target: 'node', // 注明打包的环境为node端
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2',  // 指定打包后的文件模块化导出采用的规范
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),  // 根据package.json中的dependencies来决定这些库不会放在打包的代码中，dependencies是在运行时也需要的依赖，而devDependencies是在开发时需要的
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || '"development"'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin() // 该插件帮助输出服务端的复杂逻辑为json文件，减少很多开发工作，提供效率
  ]
});

module.exports = config;
