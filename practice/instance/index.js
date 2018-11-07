import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>有{{num}}只软奶咪，肥橘子咪</div>',
  data: {
    name: '肥橘',
    num: 0
  }
})

app.$mount('#root')
console.log(app)
setInterval(() => {
  app.num++
}, 1000)
// app.$watch('num', (newVal, oldVal) => {
//   console.log({ newVal, oldVal })
// })
app.$on('test', (a) => {
  console.log({ a })
})
let tempNum = 1
setInterval(() => {
  tempNum++
  app.$emit('test', tempNum)
}, 1000)
