const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'  //必须加上双引号，否则传入的是变量，而不是字符串
    }
  }),
  new HTMLWebpackPlugin({
    template: path.resolve(__dirname, 'template.html')
  }) //  抽出HTML
];

let config = merge(baseConfig, {
  entry: path.resolve(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',   // 映射出js未编译前的代码，source-map是完整映射，但是效率低下，文件过大
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true // stylus-loader会生成sourceMap,这里使用stylus的即可，不需要自己生成，可节省时间
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    port: '4396',
    host: '0.0.0.0', //  这样的好处是可以通过localhost来访问，也可以通过内网IP来访问，如果设置成Localhost,别人的电脑不能通过IP来访问
    overlay: {
      errors: true    // 在页面显示错误
    },
    open: true,  // 启动时在浏览器开新页面
    hot: true   // 模块热替换（只替换修改部分）
  },
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js') // 使用这个vue文件才能在生成Vue实例时设置template项
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),   //模块热替换
    new webpack.NoEmitOnErrorsPlugin()  // 在编译出现错误时，是可以跳过输出阶段，避免输出资源包含错误
  ])
});

module.exports = config;
