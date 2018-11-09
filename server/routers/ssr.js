const Router = require('koa-router')
const VueServerRender = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

const serverRender = require('./server-render')

const clientManifest = require('../../public/vue-ssr-client-manifest')
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer)
})

module.exports = pageRouter
