import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'pxy',
    age: 29
  },
  getters: {
    name: state => state.name,
    age: state => state.age
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setAge(state, age) {
      state.age = age
    }
  },
  actions: {
    setName({ commit }, name) {
      commit('setName', name)
    },
    setAge({ commit }, name) {
      commit('setAge', name)
    }
  },
  modules: {
    user
  }
})
