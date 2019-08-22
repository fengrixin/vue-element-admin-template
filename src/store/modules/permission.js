import { constantRoutes, asyncRoutes } from '../../router'

const state = {
  routers: constantRoutes
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.routers = constantRoutes.concat(routers)
  }
}

const actions = {
  // permission/generateRouters
  generateRouters({ commit }, data) {
    return new Promise(resolve => {
      const { role } = data
      let routers
      if (role === 0) {  // 超管
        routers = asyncRoutes
      } else {
        routers = filterAsyncRoutes(asyncRoutes, role)
      }
      commit('SET_ROUTERS', routers)
      resolve()
    })
  }
}

/**
 * 递归过滤路由表
 * @param routes asyncRoutes
 * @param role
 */
function filterAsyncRoutes(routes, role) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // console.log(tmp)
    if (hasPermission(tmp, role)) {
      if (tmp.name === 'Example') {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 *  判断当前用户是否具有权限
 * @param roles
 * @param role
 */
function hasPermission(roles, role) {
  if (roles.meta) {
    return roles.meta.role.indexOf(role) !== -1
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
