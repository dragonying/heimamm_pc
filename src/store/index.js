// 导入 Vue
import Vue from 'vue'
// 导入 Vuex
import Vuex from 'vuex'

// use一下
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
  state: {
    // 默认没有值
    userInfo: undefined,//存储用户信息
    power:[],//权限
  }
})

// 暴露
export default store
