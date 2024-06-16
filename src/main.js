import Vue from 'vue'
import App from './App.vue'

//将路由抽离
// import router from './router/index'
import router from '@/router/index' //@符号表示/src的绝对路径  html也是@，js也是@,css ~@
import WebSocketClientManager from '@/utils/WebSocketClientManager';
Vue.config.productionTip = false



//引入全局样式
import '@/assets/css/base.css'

//到入elem
import ElementUI from 'element-ui';
import { Message, Notification } from 'element-ui';

// import 'element-ui/lib/theme-chalk/index.css'; //默认主题
import '@/assets/scss/element-variables.scss' //使用自定义主题，修改后需要重新启动项目
Vue.use(ElementUI);
//导入全局过滤器
import '@/utils/filters'
//引入vuex
import store from '@/store'

WebSocketClientManager.getInstance().addConnectStatusListener((status) => {
  Message({
    message: 'websocket connect status : ' + status,
    type: status === 'connect' ? 'success' : 'info',
    duration: 5 * 1000
  });
});

WebSocketClientManager.getInstance().addMessageListener((msg) => {
  console.log(msg)
  const { success, type, data } = msg;
  if (type == 'tip') {
    success ? Notification.success(`指令接收成功：${JSON.stringify(data)}`) : Notification.error(data);
  } else {
    //
  }


  if (msg.type === 'device_change') {
    // store.dispatch('device/updateOnlineDevices');
  }
});

new Vue({
  router: router,
  store,//  // 挂载到Vue实例上
  render: h => h(App),

}).$mount('#app')
