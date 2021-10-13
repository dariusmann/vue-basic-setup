<template>
  <v-container>
    <v-row>
      <v-col>
       <LoadingSpinner v-show="loading"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert
          v-show="showMessage.successfulLogin"
          dense
          outlined
          prominent
          text
          type="success"
        >
          <div>{{$t('component.loginForm.message.loginSuccess')}}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.userNotFound"
          dense
          outlined
          prominent
          text
          type="warning"
        >
          <div>{{$t('component.loginForm.message.emailNotFound')}}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.passwordIncorrect"
          dense
          outlined
          prominent
          text
          type="error"
        >
          <div>{{$t('component.loginForm.message.passwordNotValid')}}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.unexpectedError"
          dense
          outlined
          prominent
          text
          type="error"
        >
          <div>{{$t('component.errorMessage.unexpectedError')}}!</div>
        </v-alert>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.emailRules]"
              :label="$t('text.email')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              :label="$t('text.password')"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn elevation="2" @click="this.login">{{$t('text.login')}}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>

import AuthService, {
  UserNotFoundException,
  WrongCredentialsException
} from '@/services/auth.service'
import LoadingSpinner from '@/components/Common/LoadingSpinner'
import { UnexpectedServerError } from '@/exceptions/http.exceptions'

export default {
  name: 'LoginForm',
  components: { LoadingSpinner },
  data: function () {
    return {
      loading: false,
      valid: false,
      showPassword: false,
      email: 'dsmanyp@gmail.com',
      password: 'tomo122',
      showMessage: {
        successfulLogin: false,
        userNotFound: false,
        passwordIncorrect: false,
        unexpectedError: false
      },
      rules: {
        required: v => !!v || this.$i18n.t('errorMessage.required'),
        emailRules: v => /.+@.+/.test(v) || this.$i18n.t('errorMessage.emailNotValid')
      }
    }
  },
  methods: {
    async login () {
      this.loading = true
      this.$refs.form.validate()
      this.resetMessages()

      if (this.valid) {
        try {
          await AuthService.loginUser(this.email, this.password)
          this.showMessage.successfulLogin = true
          setTimeout(() => {
            this.$router.push({ name: 'GameCreate' })
          }, 1000)
        } catch (e) {
          if (e instanceof UserNotFoundException) {
            this.showMessage.userNotFound = true
          } else if (e instanceof WrongCredentialsException) {
            this.showMessage.passwordIncorrect = true
          } else if (e instanceof UnexpectedServerError) {
            this.showMessage.unexpectedError = true
          }
        }
      }

      this.loading = false
    },
    resetMessages () {
      this.showMessage.successfulLogin = false
      this.showMessage.userNotFound = false
      this.showMessage.passwordIncorrect = false
      this.showMessage.unexpectedError = false
    }
  }
}
</script>

<style scoped>

</style>
