import Vue from 'vue'
import App from './App.vue'

//将路由抽离
import router from '@/router/index' //@符号表示/src的绝对路径  html也是@，js也是@,css ~@

//引入全局样式
import '@/assets/css/base.css'

//到入elem
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'; //默认主题
import '@/assets/scss/element-variables.scss' //使用自定义主题，修改后需要重新启动项目
Vue.use(ElementUI);
//导入全局过滤器
import '@/utils/filters'
//引入vuex
import store from '@/store'

//引入全局组件
import './globalComponents/index'


// 导入自己封装的插件
// import plugin from '@/utils/plug.js'
// 使用插件
// Vue.use(plugin)


// 过滤器
import * as filters from '@/filter/common'
import '@/style/index.css' // 导入iconfont


// 全局注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false


new Vue({
  router: router,
  store,//  // 挂载到Vue实例上
  render: h => h(App),

}).$mount('#app')
