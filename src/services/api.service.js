import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import Store from '@/stores'

const ApiService = {
  _authenticationInterceptor: null,

  init (baseUrl) {
    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.common.Authorization = process.env.VUE_APP_BACKEND_API_TOKEN
  },

  get (resource, addConfig) {
    const config = { withCredentials: true, ...addConfig }
    return axios.get(resource, config)
  },

  post (resource, data, addConfig) {
    const config = { withCredentials: true, ...addConfig }
    return axios.post(resource, data, config)
  },

  put (resource, data, addConfig) {
    const config = { withCredentials: true, ...addConfig }
    return axios.put(resource, data, config)
  },

  delete (resource, addConfig) {
    const config = { withCredentials: true, ...addConfig }
    return axios.delete(resource, config)
  },

  mountAuthenticationInterceptor: function () {
    this._authenticationInterceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.request.status === StatusCodes.FORBIDDEN) {
          Store.dispatch('auth/logout')
          throw error
        }

        throw error
      }
    )
  },

  unmountAuthenticationInterceptor () {
    axios.interceptors.response.eject(this._authenticationInterceptor)
  }
}

export default ApiService
