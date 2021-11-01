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
          v-show="showMessage.registerSuccessful"
          dense
          outlined
          prominent
          text
          type="success"
        >
          <div v-html="$t('component.registerForm.message.registerSuccess', {here: loginLink})"></div>
        </v-alert>
        <v-alert
          v-show="showMessage.userAlreadyExists"
          dense
          outlined
          prominent
          text
          type="warning"
        >
          <div>{{$t('component.registerForm.message.userAlreadyExists')}}!</div>
        </v-alert>
        <v-alert
          v-show="showMessage.unexpectedError"
          dense
          outlined
          prominent
          text
          type="error"
        >
          <div>{{$t('errorMessage.unexpectedError')}}!</div>
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
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              :label="$t('text.password')"
              :hint="$t('hint.minAmountChars', { amount: 8 })"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn elevation="2" @click="this.register">{{ $t('text.register') }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import AuthService, { UserAlreadyExists } from '@/services/auth.service'
import LoadingSpinner from '@/components/Common/LoadingSpinner'
import { UnexpectedServerError } from '@/exceptions/http.exceptions'

export default {
  name: 'RegisterForm',
  components: { LoadingSpinner },
  data: function () {
    return {
      valid: false,
      loading: false,
      email: '',
      password: '',
      showPassword: false,
      showMessage: {
        registerSuccessful: false,
        userAlreadyExists: false,
        unexpectedError: false
      },
      rules: {
        required: value => !!value || this.$i18n.t('errorMessage.required'),
        min: v => v.length >= 8 || this.$i18n.t('errorMessage.required', { min: 8 }),
        emailRules: v => /.+@.+/.test(v) || this.$i18n.t('errorMessage.emailNotValid')
      }
    }
  },
  computed: {
    loginLink () {
      return `<a href="/auth/login" class="LoginLink">${this.$i18n.t('text.here')}</a>`
    }
  },
  methods: {
    async register () {
      this.loading = true
      this.$refs.form.validate()
      this.resetMessages()

      if (this.valid) {
        try {
          await AuthService.registerUser(this.email, this.password)
          this.showMessage.registerSuccessful = true
        } catch (e) {
          if (e instanceof UserAlreadyExists) {
            this.showMessage.userAlreadyExists = true
          } else if (e instanceof UnexpectedServerError) {
            this.showMessage.unexpectedError = true
          }
        }
      }
      this.loading = false
    },
    resetMessages () {
      this.showMessage.registerSuccessful = false
      this.showMessage.userAlreadyExists = false
      this.showMessage.unexpectedError = false
    }
  }
}
</script>

<style lang="scss">
a.LoginLink {
  text-decoration: underline;
}
</style>
