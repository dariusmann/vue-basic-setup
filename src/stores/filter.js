import { StorageService } from '@/services/storage.service'
import StorageConstants from '@/constants/storage.constants'

const state = () => (
  JSON.parse(StorageService.get(StorageConstants.Filter)) || {
    gameFormats: [],
    playerLevels: []
  }
)

const getters = {
  getGameFormats (state) {
    return state.gameFormats
  },
  getPlayerLevels (state) {
    return state.playerLevels
  }
}

const actions = {
  updateGameFormats: function ({ commit }, { gameFormats }) {
    commit('setGameFormats', gameFormats)
  },
  updatePlayerLevels: function ({ commit }, { playerLevels }) {
    commit('setPlayerLevels', playerLevels)
  },
  removeGameFormats: function ({ commit, getters }, { gameFormat }) {
    const gameFormats = getters.getGameFormats

    const index = gameFormats.indexOf(gameFormat)
    if (index > -1) {
      gameFormats.splice(index, 1)
    }

    commit('setGameFormats', gameFormats)
  },
  removePlayerLevels: function ({ commit, getters }, { playerLevel }) {
    const playerLevels = getters.getPlayerLevels

    const index = playerLevels.indexOf(playerLevel)
    if (index > -1) {
      playerLevels.splice(index, 1)
    }

    commit('setPlayerLevels', playerLevels)
  }
}

const mutations = {
  setGameFormats (state, gameFormats) {
    state.gameFormats = gameFormats
    StorageService.save(StorageConstants.Filter, JSON.stringify(state))
  },
  setPlayerLevels (state, playerLevels) {
    state.playerLevels = playerLevels
    StorageService.save(StorageConstants.Filter, JSON.stringify(state))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
