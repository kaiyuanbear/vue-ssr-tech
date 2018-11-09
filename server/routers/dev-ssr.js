const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs') // api与node的fs模块类似，区别是node的fs模块会将文件写入到磁盘上（这样很耗时），而memory-fs则是将文件写入到内存，效率更高
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  // stats = stats.toJson()
  // stats.erros.forEach(err => console.log(err))
  // stats.hasWarnings.forEach(warn => console.warn(err))

  // 网站推荐 start
  const info = stats.toJson()
  if (stats.hasErrors()) {
    info.errors.forEach(err => console.log(err))
    // console.log(info.errors)
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach(warn => console.log(warn))
    // console.warn(info.warnings)
  }
  // 网站推荐 end

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))// 必须制定是utf-8，否则是二进制文件
  console.log(`new bundle generated`)
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '请稍等，别着急...'
    return
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:9527/public/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRender.createBundleRenderer(bundle, {
    inject: false, // 不使用它的注入功能
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
