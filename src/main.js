import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import '@/styles/reset.css'
import '@/styles/index.less'
// import '!style-loader!css-loader!less-loader!./styles/index.less'
// import './styles/judgeBrowser'

// 将axios挂载到vue实例上
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
