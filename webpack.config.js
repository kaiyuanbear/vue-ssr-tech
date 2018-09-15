const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

let config = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-[hash].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'  //必须加上双引号，否则传入的是变量，而不是字符串
            }
        }),
        new HTMLWebpackPlugin() //  抽出HTML
    ]
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';   // 映射出js未编译前的代码，source-map是完整映射，但是效率低下，文件过大
    config.devServer = {
        port: '9527',
        host: '0.0.0.0', //  这样的好处是可以通过localhost来访问，也可以通过内网IP来访问，如果设置成Localhost,别人的电脑不能通过IP来访问
        overlay: {
            errors: true    // 在页面显示错误
        },
        open: true,  // 启动时在浏览器开新页面
        hot: true   // 模块热替换（只替换修改部分）
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),   //模块热替换
        new webpack.NoEmitOnErrorsPlugin()  // 在编译出现错误时，是可以跳过输出阶段，避免输出资源包含错误
    )
}

module.exports = config;