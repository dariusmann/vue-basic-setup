import ApiService from '@/services/api.service'
import Store from '@/stores'
import Router from '@/router'
import { StatusCodes } from 'http-status-codes'
import AuthConstants from '@/constants/auth.constants'
import { UnexpectedServerError } from '@/exceptions/http.exceptions'

const AuthService = {
  registerUser: async function (email, password) {
    try {
      await ApiService.post('/auth/register', {
        email: email,
        password: password
      })
    } catch (error) {
      if (error.response.status === StatusCodes.CONFLICT) {
        throw new UserAlreadyExists(error.response.status, error.response.message)
      } else {
        throw new UnexpectedServerError(error.response.status, error.response.message)
      }
    }
  },
  loginUser: async function (email, password) {
    try {
      const response = await ApiService.post('/auth/login', {
          email: email,
          password: password
        }
      )
      if (response.status === StatusCodes.NO_CONTENT) {
        await Store.dispatch('auth/login')
      }
    } catch (error) {
      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        Store.commit('auth/setLoginApiStatus', AuthConstants.LoginApiStatusFailed)

        throw new WrongCredentialsException(error.response.status, error.response.message)
      } if (error.response.status === StatusCodes.NOT_FOUND) {
        Store.commit('auth/setLoginApiStatus', AuthConstants.LoginApiStatusFailed)

        throw new UserNotFoundException(error.response.status, error.response.message)
      } else {
        Store.commit('auth/setLoginApiStatus', AuthConstants.LoginApiStatusFailed)

        throw new UnexpectedServerError(error.response.status, error.response.message)
      }
    }
  },
  logoutUser: async function () {
    try {
      const response = await ApiService.post('/auth/logout')

      if (response.status === StatusCodes.NO_CONTENT) {
        await Store.dispatch('auth/logout')
        await Router.push('Login')
      }
    } catch (error) {
        throw new UnexpectedServerError(error.response.status, error.response.message)
    }
  }
}

class WrongCredentialsException extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

class UserNotFoundException extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

class UserAlreadyExists extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

export default AuthService

export { AuthService, WrongCredentialsException, UserNotFoundException, UserAlreadyExists }
