const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'  //必须加上双引号，否则传入的是变量，而不是字符串
        }
    }),
    new HTMLWebpackPlugin() //  抽出HTML
];

let config;

if (isDev) {
    config = merge(baseConfig, {
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
            port: '9527',
            host: '0.0.0.0', //  这样的好处是可以通过localhost来访问，也可以通过内网IP来访问，如果设置成Localhost,别人的电脑不能通过IP来访问
            overlay: {
                errors: true    // 在页面显示错误
            },
            open: true,  // 启动时在浏览器开新页面
            hot: true   // 模块热替换（只替换修改部分）
        },
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),   //模块热替换
            new webpack.NoEmitOnErrorsPlugin()  // 在编译出现错误时，是可以跳过输出阶段，避免输出资源包含错误
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output:{
            filename: '[name].[chunkhash:8].js'
        },
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
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'       // 和entry的vendor对应，将指定的lib打包为一个文件
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'     // webpack的模块文件放在runtime中，好处是新添加的模块会添加在文件末尾，这样hash不会改变，能够长期缓存（待验证），vendor需要在runtime前面
            })
        ])
    });
}

module.exports = config;