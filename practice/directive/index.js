import Vue from 'vue'

new Vue({
  el: '#root',
  template:
  `
    <div>
      <input type="radio" :value="1" v-model="radio">
      <input type="radio" :value="2" v-model="radio">  
    </div>
  `,
  data: {
    radio: 1
  }
})
