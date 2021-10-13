<template>
  <v-container>
    <h1>{{ $t('view.game.createGame.header') }}</h1>
    <LoadingSpinner v-show="loading"/>
    <v-alert
      v-show="showMessage.createSuccess"
      dense
      outlined
      prominent
      text
      type="success"
    >
      <div>{{ $t('view.game.createGame.message.createGameSuccess') }}!</div>
    </v-alert>
    <v-alert
      v-show="showMessage.error"
      dense
      outlined
      prominent
      text
      type="error"
    >
      <div>{{ errorMessage }}!</div>
    </v-alert>
    <CreateGameForm @send="create"/>
  </v-container>
</template>

<script>
import CreateGameForm from '@/components/Game/GameForm'
import GameService from '@/services/game.service'
import LoadingSpinner from '@/components/Common/LoadingSpinner'

export default {
  name: 'GameCreate',
  components: { LoadingSpinner, CreateGameForm },
  data: function () {
    return {
      loading: false,
      showMessage: {
        createSuccess: false,
        error: false
      },
      errorMessage: ''
    }
  },
  methods: {
    async create (details) {
      this.loading = true
      this.showMessage.error = false

      try {
        await GameService.createGame(details)
        this.showMessage.createSuccess = true
      } catch (e) {
        this.showMessage.error = true
        this.errorMessage = e.message
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
