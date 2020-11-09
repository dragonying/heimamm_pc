import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false
//引入axios
import axios from 'axios'
axios.defaults.baseURL = "";//设置全局api host
// (3)给Vue的构造函数的原型加了一个属性$axios
// 所有Vue的实例都有$axios这个属性
// 规范:如果要给Vue的原型加属性，名字前面加$，方便让人区分是vue实例自己的属性还是原型的属性
Vue.prototype.$axios = axios;


console.log(router)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
