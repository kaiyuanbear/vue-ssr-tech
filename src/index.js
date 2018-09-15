import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div');
document.body.appendChild(root);

import './assets/styles/test.css'
import './assets/images/bg.jpeg'
import './assets/styles/test.styl'

new Vue({
    render: h => h(App)
}).$mount(root);