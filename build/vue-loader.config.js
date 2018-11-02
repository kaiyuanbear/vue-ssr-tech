// const docsLoader = require.resolve('./docs-loader');

module.exports = (isDev) => {
    return {
        preserveWhiteSpace: true,    // 空格换行不会渲染出来
        extractCSS: !isDev,            // Vue默认使用模块异步加载的方式，使用到的模块才会将css加载到dom中去，如果设置为true，将会统一抽取.vue中的css到指定的webpack.config.js中的css文件
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',    // css模块化，可以让.vue中的css带上hash串，避免互相覆盖
            camelCase: true,                                    // css模块命名使用驼峰法则
        },
        // loaders: {'docs': docsLoader},    // 可设置针对.vue文件中的新标签块进行解析的loader
        // preLoader: {},                      // 预解析
        // postLoader: {},                     // 后解析
    }
}