import ApiService from '@/services/api.service'
import moment from 'moment'
import DatetimeConstants from '@/constants/datetime.constants'
import { StatusCodes } from 'http-status-codes'
import { BadRequestException, UnexpectedServerError } from '@/exceptions/http.exceptions'
import { GameDataFactory } from '@/factories/game.factories'

const GameService = {
  createGame: async function (details) {
    try {
      await ApiService.post('/games', {
        details: this.prepareGameData(details)
      })
    } catch (error) {
      if (error.response.status === StatusCodes.BAD_REQUEST) {
        throw new BadRequestException(error)
      }

      throw error
    }
  },
  readGames: async function (gameType, fromDate, toDate) {
    try {
      const params = {
        type: gameType,
        from: fromDate.format(DatetimeConstants.DateFormat),
        to: toDate.format(DatetimeConstants.DateFormat)
      }

      const response = await ApiService.get('/games', {
        params: params
      })

      return GameDataFactory.create(response.data)
    } catch (error) {
      if (error.response.status === StatusCodes.BAD_REQUEST) {
        throw new BadRequestException(error.response.status, error.response.message)
      } else {
        throw new UnexpectedServerError(error.response.status, error.response.message)
      }
    }
  },
  prepareGameData: function (details) {
    const startDatetime = moment(details.startDatetime)
    const endDatetime = moment(details.endDatetime)

    return {
      type: details.type,
      address: details.address,
      min_player: details.playersAmountRange[0],
      max_player: details.playersAmountRange[1],
      start_datetime: startDatetime.format(DatetimeConstants.DatetimeFormat),
      end_datetime: endDatetime.format(DatetimeConstants.DatetimeFormat)
    }
  }
}

export default GameService
