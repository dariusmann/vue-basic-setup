<template>
  <v-toolbar flat>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-app-bar-nav-icon
          v-bind="attrs"
          v-on="on"/>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <router-link to="/">Home</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <router-link to="/games">{{ $t('text.play') }}</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-show="isLoggedIn()">
          <v-list-item-title>
            <router-link to="/games/create">{{
                $t('component.menu.linkText.createGame')
              }}
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-show="!isLoggedIn()">
          <v-list-item-title>
            <router-link to="/auth/register">{{ $t('text.register') }}</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-show="!isLoggedIn()">
          <v-list-item-title>
            <router-link to="/auth/login">{{ $t('text.login') }}</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-show="isLoggedIn()">
          <v-list-item-title>
            <router-link to="/auth/logout">{{ $t('text.logout') }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <LanguageSelection :default-select="getLangSelect()"/>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthConstants from '@/constants/auth.constants'
import LanguageSelection from '@/components/Common/LanguageSelection'
import { IsoCodeMappingFlagCode } from '@/constants/lang.constants'

export default {
  name: 'Menu',
  components: { LanguageSelection },
  computed: {
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus'
    }),
    ...mapGetters('lang', {
      getLanguageCode: 'getLanguageCode'
    })
  },
  methods: {
    isLoggedIn () {
      return this.getLoginApiStatus === AuthConstants.LoginApiStatusSuccess
    },
    getLangSelect () {
      return {
        flagCode: IsoCodeMappingFlagCode[this.getLanguageCode],
        isoCode: this.getLanguageCode
      }
    }
  }
}
</script>

<style lang="scss">

</style>
