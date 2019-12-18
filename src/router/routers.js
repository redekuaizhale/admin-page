const _import = require('../libs/util.import.' + process.env.NODE_ENV)

/**
 * 左侧菜单外
 * @type {Array}
 */
const basicRouter = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: _import('/login/login')
  }
]

export default [
  ...basicRouter
]
