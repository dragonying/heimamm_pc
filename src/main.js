import Vue from 'vue'
import App from './App.vue'

//将路由抽离
// import router from './router/index'
import router from '@/router/index' //@符号表示/src的绝对路径  html也是@，js也是@,css ~@

Vue.config.productionTip = false



//引入全局样式
import '@/assets/css/base.css'

//到入elem
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'; //默认主题
import '@/assets/scss/element-variables.scss' //使用自定义主题，修改后需要重新启动项目
Vue.use(ElementUI);
//导入全局过滤器
import '@/utils/filters'

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
