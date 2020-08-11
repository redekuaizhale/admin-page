import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import menu from './module/menu'
import router from './module/route'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: false,
    collapsed: false
  },
  mutations: {
    SET_DEVICE(state, isMobile) {
      state.isMobile = isMobile
    },
    SET_COLLAPSED(state, collapsed) {
      state.collapsed = collapsed
    }
  },
  actions: {
    setDevice({ commit }, isMobile) {
      commit('SET_DEVICE', isMobile)
    },
    setCollapsed({ commit }, collapsed) {
      commit('SET_COLLAPSED', collapsed)
    }
  },
  modules: {
    user,
    menu,
    router
  }
})
