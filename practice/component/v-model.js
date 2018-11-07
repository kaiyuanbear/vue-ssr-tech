import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <h4>肥橘的名字</h4>
      <slot></slot>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleInput (ev) {
      this.$emit('change', ev.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one v-model="value">
        <p>奶咪子</p>
      </comp-one>
    </div>
  `,
  data () {
    return {
      value: 123
    }
  },
  methods: {

  }
})
