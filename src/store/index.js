// 导入 Vue
import Vue from 'vue'
// 导入 Vuex
import Vuex from 'vuex'
import { getGroupOptions } from '@/api/user'

// use一下
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
  state: {
    // 默认没有值
    userInfo: { username: '龙英' },//存储用户信息
    power: [],//权限
    groupOptions: [],
  },
  mutations: {
    getGroupOptions(state, data) {
      state.groupOptions = data;
    }
  },
  actions: {
    getGroupOptions({ commit }) {
      getGroupOptions(data => commit('getGroupOptions', data))
    }
  }
})

// 暴露
export default store
