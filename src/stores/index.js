import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/stores/auth'
import lang from '@/stores/lang'
import filter from '@/stores/filter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    auth,
    lang,
    filter
  }
})
