import { getUserMenuReq } from '../../../../api/sys.user'
import layoutHeaderAside from '../../../../layout/header-aside'
import router from '../../../../router/index'
import util from '../../../../libs/util'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export default {
  namespaced: true,
  state: {
    routerData: []
  },
  mutations: {
    setRouter (state, routerData) {
      state.routerData = routerData
    }
  },
  actions: {
    init ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserMenuReq().then(async res => {
          const routerData = res.data
          await commit('setRouter', routerData)
          await dispatch('pushRouter', routerData)
          await commit('d2admin/menu/asideSet', util.parseMenuData(routerData), { root: true })
          resolve()
        })
      })
    },
    pushRouter ({ commit, dispatch }, routerData) {
      const addRouters = []
      routerData.map(parent => {
        const childRouters = []
        if (parent.children) {
          parent.children.map(child => {
            childRouters.push({
              path: child.path,
              name: child.name,
              meta: {
                title: child.title,
                auth: true
              },
              component: _import(child.component)
            })
          })
        }
        addRouters.push({
          path: `/${parent.path}`,
          redirect: parent.redirect ? { name: parent.name } : null,
          component: parent.component ? _import(parent.component) : layoutHeaderAside,
          children: childRouters,
          name: parent.name,
          meta: {
            auth: true
          }
        })
      })
      router.addRoutes(addRouters)
    }
  }
}
