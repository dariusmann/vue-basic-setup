import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from '@/plugins/vuetify'
import ApiService from '@/services/api.service'
import Axios from 'axios'
import DatetimePicker from 'vuetify-datetime-picker'
import i18n from '@/plugins/i18n'
import CountryFlag from 'vue-country-flag'
import 'vue-phone-number-input/nuxt/plugin'
import VueGtag from 'vue-gtag'

ApiService.init(process.env.VUE_APP_BACKEND_API_PROXY_URL)

Vue.prototype.$http = Axios
Vue.config.devtools = true

Vue.component('country-flag', CountryFlag)

Vue.use(DatetimePicker)

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_CODE }
}, router)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  gtag: VueGtag,
  render: h => h(App)
}).$mount('#app')
