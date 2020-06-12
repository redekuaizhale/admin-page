import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import menu from './module/menu'
import router from './module/route'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: false
  },
  mutations: {
    SET_DEVICE(state, isMobile) {
      state.isMobile = isMobile
    }
  },
  actions: {
    setDevice({ commit }, isMobile) {
      commit('SET_DEVICE', isMobile)
    }
  },
  modules: {
    user,
    menu,
    router
  }
})
