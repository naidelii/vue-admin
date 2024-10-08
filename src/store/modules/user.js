import { getInfo } from '@/api/user'
import { login, logout } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  name: '',
  avatar: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // 调用login请求
      login(userInfo).then(resp => {
        const token = resp.data
        // 设置到cookie中
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // 调用获取用户信息的接口
      getInfo().then(resp => {
        const { username, avatar } = resp.data
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      // 调用logout方法
      logout().then(() => {
        // 清空state中的用户信息
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        // 清空本地缓存的token
        removeToken()
        // 重置路由
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

