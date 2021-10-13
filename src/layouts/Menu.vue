<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/games" v-show="isLoggedIn">{{ $t('text.play') }}</router-link>
          <router-link to="/games/create" v-show="isLoggedIn">{{ $t('component.menu.linkText.createGame') }}</router-link>
          <router-link to="/auth/register" v-show="!isLoggedIn">{{ $t('text.register') }}</router-link>
          <router-link to="/auth/login" v-show="!isLoggedIn">{{ $t('text.login') }}</router-link>
          <router-link to="/auth/logout" v-show="isLoggedIn">{{ $t('text.logout') }}</router-link>
        <LanguageSelection :default-select="getLangSelect()"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
#nav {
  display: flex;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &:not(:first-child) {
      margin-left: 5px;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
