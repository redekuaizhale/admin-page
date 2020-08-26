import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import ViewUI from 'view-design'
import { permissionsReq } from '../api/user'
import config from '../config/config'
import { getLoginUserToken } from '../libs/commonUtils'

Vue.use(Router)

export const router = new Router({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  if (getLoginUserToken()) {
    const { path } = to
    if (path === '/') {
      next({
        path: config.INDEX
      })
    } else {
      if (to.name === config.LOGIN) {
        next()
      } else {
        if (to.name && to.name !== '/') {
          permissionsReq({ path: path }).then(res => {
            next()
          }).catch(() => {
            next({
              name: from.name
            })
          }).finally(() => {
            ViewUI.LoadingBar.finish()
          })
        } else {
          next()
        }
      }
    }
  } else {
    if (to.name === config.LOGIN) {
      next()
    } else {
      next({
        name: config.LOGIN
      })
    }
  }
})

router.afterEach(to => {
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
