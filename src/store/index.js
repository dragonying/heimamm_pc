// 导入 Vue
import Vue from 'vue'
// 导入 Vuex
import Vuex from 'vuex'
import {
  Message
} from 'element-ui';


// use一下
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
  state: {
    isLockSort: false
  },
  //同步
  mutations: {
    //设置排序
    setLockSort: function (state) {
      if (state.isLockSort) {
        Message.closeAll();
        Message({
          message: "排序已锁定",
          type: "success",
          duration: 2000
        });
      }
      state.isLockSort = !state.isLockSort;
    }
  },
  //异步
  actions: {},
  getters: {},
  modules: {}
})

// 暴露
export default store