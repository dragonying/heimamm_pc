// 导入 Vue
import Vue from 'vue';
// 导入 Vuex
import Vuex from 'vuex';
import { Message } from 'element-ui';
import { getGroupOptions, dataStatic, auth } from '@/api/user'

// use一下
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
  state: {
    // 默认没有值
    userInfo: {},//存储用户信息
    power: [],//权限
    groupOptions: [],
    dataStatic: {},
  },
  mutations: {
    getGroupOptions(state, data) {
      state.groupOptions = data;
    },
    dataStatic(state, data) {
      state.dataStatic = data;
    },
    auth(state, data) {
      state.userInfo = data;
      if (!data?.code) {
        Message.error('验证失败，卡密无效或过期');
      }
    }
  },
  actions: {
    getGroupOptions({ commit }) {
      getGroupOptions(data => commit('getGroupOptions', data))
    },
    dataStatic({ commit }) {
      dataStatic(data => commit('dataStatic', data))
    },
    auth({ commit }, param = {}) {
      auth(param, data => commit('auth', data));
    }
  }
})

// 暴露
export default store
