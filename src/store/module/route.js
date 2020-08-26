import router from '../../router/permissions'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import Main from '../../components/main/main'
export default {
  state: {
    routerList: []
  },
  mutations: {
    SET_USER_ROUTER(state, list) {
      state.routerList = []
      const newRouterList = []
      list.map(parent => {
        const childRouters = []
        if (parent.children) {
          parent.children.map(child => {
            childRouters.push({
              path: child.path,
              name: child.name,
              meta: {
                icon: child.icon,
                title: child.title,
                auth: true,
                parent: child.parentName
              },
              component: _import(child.component)
            })
          })
        }
        newRouterList.push({
          path: `${parent.path}`,
          redirect: parent.redirect ? { name: parent.redirect } : null,
          component: Main,
          children: childRouters,
          name: parent.name,
          meta: {
            auth: true,
            icon: parent.icon
          }
        })
      })
      state.routerList = newRouterList
      router.addRoutes(state.routerList)
    }
  },
  actions: {
    setUserRouter({ commit, dispath }, list) {
      commit('SET_USER_ROUTER', list)
    }
  }
}
