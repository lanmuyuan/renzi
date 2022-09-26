import { login } from '@/api'
const state = {
  token: null
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}
const actions = {
  async asyncLogin({ commit }, logindata) {
    const data = await login(logindata)
    commit('SET_TOKEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
