import { login, getUserInfo, getUserDetailById } from '@/api'
const state = {
  token: null,
  userInfo: {}
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE_USERINFO(state) {
    state.userInfo = null
  }
}
const actions = {
  async asyncLogin({ commit }, logindata) {
    const data = await login(logindata)
    commit('SET_TOKEN', data)
  },
  async asyncGetUserInfo({ commit }) {
    // 获取用户基本信息
    const res = await getUserInfo()
    // 根据id获取用户信息
    const res1 = await getUserDetailById(res.userId)
    const result = { ...res, ...res1 }
    commit('SET_USERINFO', result)
    return JSON.parse(JSON.stringify(result))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
