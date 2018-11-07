import Vue from 'vue'

new Vue({
  el: '#root',
  template:
  `
    <div>
      <div v-html="text" :class="isActive ? 'naimi' : 'feiju'">{{text}}</div>
      <h3>{{name}}</h3>
      <h4>{{getName()}}</h4>
      <input type="text" v-model="num">
    </div>
  `,
  data: {
    isActive: false,
    text: `<p>肥奶咪</p>`,
    firstName: 'white',
    secondName: 'cat',
    num: 123
  },
  methods: {
    getName () {
      console.log('getName')
      return this.firstName + this.secondName
    }
  },
  computed: {
    name () {
      console.log('name')
      console.log(this.num)
      return this.firstName + this.secondName
    }
  }
})
