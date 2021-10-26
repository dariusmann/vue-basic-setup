<template>
  <v-container>
    <v-row>
      <v-col>
        <LoadingSpinner v-show="loading"/>
        <h1>{{ $t('view.game.createGame.header') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
          v-show="showMessage.toManyGamesForUser"
          dense
          outlined
          prominent
          text
          type="warning"
        >
          <div>{{ errorMessage }}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.unexpectedError"
          dense
          outlined
          prominent
          text
          type="error"
        >
          <div>{{ errorMessage }}!</div>
        </v-alert>
      </v-col>
    </v-row>
    <CreateGameForm @send="create" :loading="this.loading"/>
  </v-container>
</template>

<script>
import CreateGameForm from '@/components/Game/GameForm'
import GameService from '@/services/game.service'
import LoadingSpinner from '@/components/Common/LoadingSpinner'
import { ToManyGameForUserException } from '@/exceptions/game.exceptions'

export default {
  name: 'GameCreate',
  components: { LoadingSpinner, CreateGameForm },
  data: function () {
    return {
      loading: false,
      showMessage: {
        createSuccess: false,
        toManyGamesForUser: false,
        unexpectedError: false
      },
      errorMessage: ''
    }
  },
  methods: {
    async create (data) {
      this.loading = true
      this.showMessage.createSuccess = false
      this.showMessage.toManyGamesForUser = false
      this.showMessage.unexpectedError = false
      this.errorMessage = ''

      try {
        await GameService.createGame(data)
        this.showMessage.createSuccess = true
        window.scrollTo(0, 0)
      } catch (e) {
        if (e instanceof ToManyGameForUserException) {
          this.showMessage.toManyGamesForUser = true
          this.errorMessage = this.$i18n.t('view.game.createGame.message.toManyGamesForUser')
        } else {
          this.showMessage.unexpectedError = true
          this.errorMessage = this.$i18n.t('errorMessage.unexpectedError')
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
