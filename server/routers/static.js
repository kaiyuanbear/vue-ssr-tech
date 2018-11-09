const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({ prefix: '/public'}) // 只会处理待/public的静态资源

staticRouter.get('*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
