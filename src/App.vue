<template>
  <v-app>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    </head>
    <v-app-bar app>
      <Menu/>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>

</template>

<script>
import Menu from '@/layouts/Menu'
import ApiService from '@/services/api.service'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { Menu },
  computed: {
    ...mapGetters('lang', {
      getLanguageCode: 'getLanguageCode'
    })
  },
  created: function () {
    ApiService.mountAuthenticationInterceptor()
    this.$i18n.locale = this.getLanguageCode
  },
  destroyed () {
    ApiService.unmountAuthenticationInterceptor()
  }
}
</script>

<style lang="scss">
@import "./assets/sass/main.scss";
</style>
