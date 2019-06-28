import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = (titleText) => {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = (url) => {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * route中格式化菜单数据
 * 如果子菜单只有一个，将父菜单隐藏
 * @param routerData
 * @returns {Array}
 */
util.parseMenuData = (routerData) => {
  if (!routerData) {
    return []
  }
  const menuData = []
  for (const parent of routerData) {
    if (parent.component) {
      continue
    }
    const children = []
    if (parent.children) {
      parent.children.map(child => {
        children.push({
          name: child.name,
          path: `${child.path}`,
          title: child.title,
          icon: child.icon
        })
      })
    }
    if (children.length === 1) {
      menuData.push(children[0])
    } else {
      menuData.push({
        name: parent.name,
        title: parent.title,
        icon: parent.icon,
        children: children
      })
    }
  }
  return menuData
}
export default util
