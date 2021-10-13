import { StorageService } from '@/services/storage.service'
import StorageConstants from '@/constants/storage.constants'
import { DefaultLanguageCode } from '@/constants/lang.constants'
import i18n from '@/plugins/i18n'

const state = () => ({
  languageCode: StorageService.get(StorageConstants.LanguageCode) || DefaultLanguageCode.toString()
})

const getters = {
  getLanguageCode (state) {
    return state.languageCode
  }
}

const actions = {
  updateLanguageCode: function ({ commit, dispatch }, { code }) {
    commit('setLanguageCode', code)
    StorageService.save(StorageConstants.LanguageCode, code)
    i18n.locale = code
  }
}

const mutations = {
  setLanguageCode (state, code) {
    state.languageCode = code
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
