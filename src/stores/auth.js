import { StorageService } from '@/services/storage.service'
import StorageConstants from '@/constants/storage.constants'
import AuthConstants from '@/constants/auth.constants'

const state = () => ({
  loginApiStatus: StorageService.get(StorageConstants.LoginStatusApiKey) || ''
})

const getters = {
  getLoginApiStatus (state) {
    return state.loginApiStatus
  }
}

const actions = {
  login: async function ({ commit, dispatch }) {
    commit('setLoginApiStatus', AuthConstants.LoginApiStatusSuccess)
    StorageService.save(StorageConstants.LoginStatusApiKey, AuthConstants.LoginApiStatusSuccess)
  },
  logout: async function ({ commit, dispatch }) {
    commit('setLoginApiStatus', AuthConstants.LoginApiStatusLogout)
    StorageService.save(StorageConstants.LoginStatusApiKey, AuthConstants.LoginApiStatusLogout)
  }
}

const mutations = {
  setLoginApiStatus (state, status) {
    state.loginApiStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
