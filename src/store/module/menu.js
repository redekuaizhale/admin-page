import { userMenusReq } from '../../api/user'

export default {
  state: {
    userMenuList: []
  },
  mutations: {
    SET_USER_MENU(state, data) {
      state.userMenuList = data
    }
  },
  actions: {
    setUserMenu({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        userMenusReq().then(async res => {
          await commit('SET_USER_MENU', res.data)
          await dispatch('setUserRouter', res.data)
          resolve()
        })
      })
    }
  }
}
