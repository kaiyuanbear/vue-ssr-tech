import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)

    router.onReady(() => { // push成功之后的回调
      const matchedcomponents = router.getMatchedComponents()
      if (matchedcomponents.length) {
        return reject(new Error('No component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
