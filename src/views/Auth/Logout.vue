<template>
  <v-container>
    <v-row>
      <v-col>
        <LoadingSpinner v-show="loading"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>{{ $t('view.auth.logout.header') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert
          v-show="showMessage.logoutSuccess"
          dense
          outlined
          prominent
          text
          type="success"
        >
          <div>{{ $t('view.auth.logout.message.logoutSuccessful') }}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.unexpectedError"
          dense
          outlined
          prominent
          text
          type="warning"
        >
          <div>{{ $t('errorMessage.unexpectedError') }}!</div>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          color="teal"
          elevation="2"
          class="white--text"
          @click="send"
        >
          {{ $t('text.logout') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '@/services/auth.service'
import LoadingSpinner from '@/components/Common/LoadingSpinner'

export default {
  name: 'Logout',
  components: { LoadingSpinner },
  data: function () {
    return {
      loading: false,
      showMessage: {
        logoutSuccess: false,
        unexpectedError: false
      }
    }
  },
  methods: {
    async send () {
      this.loading = true

      try {
        await AuthService.logoutUser()
        this.showMessage.logoutSuccess = true

        setTimeout(() => {
          this.$router.push({ name: 'Login' })
        }, 1000)
      } catch (error) {
        this.showMessage.unexpectedError = true
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
