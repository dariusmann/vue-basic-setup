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

ApiService.init(process.env.VUE_APP_BACKEND_API_URL)

Vue.prototype.$http = Axios
Vue.config.devtools = true

Vue.component('country-flag', CountryFlag)

Vue.use(DatetimePicker)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
