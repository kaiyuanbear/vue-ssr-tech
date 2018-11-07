import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({ // 采用返回一个实例对象的方式是因为该项目在服务端渲染，为了防止内存溢出
    // base: '/mao/', // 该段会作为基路径
    fallback: true,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    mode: 'history', // 默认为hash模式，但是hash不利于SEO，因为location中的search不会被搜索到
    // parseQuery (query) {
    //
    // },
    // stringifyQuery (obj) {
    // },
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
