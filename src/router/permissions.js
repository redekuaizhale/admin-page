import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import ViewUI from 'view-design'
import utils from '../libs/commonUtils'
import { permissionsReq } from '../api/user'
Vue.use(Router)

export const router = new Router({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  if (utils.getLoginUserToken()) {
    const { path } = to
    if (path === '/') {
      next()
    } else {
      if (to.name === 'login') {
        next()
      } else {
        if (to.name) {
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
    if (to.name === 'login') {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})

router.afterEach(to => {
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
