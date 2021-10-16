import ApiService from '@/services/api.service'
import DatetimeConstants from '@/constants/datetime.constants'
import { StatusCodes } from 'http-status-codes'
import { BadRequestException, UnexpectedServerError } from '@/exceptions/http.exceptions'
import { GameDataFactory } from '@/factories/game.factories'
import { ToManyGameForUserException } from '@/exceptions/game.exceptions'
import { TimezoneHelper } from '@/helpers/datime.helpers'

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
      if (error.response.status === StatusCodes.CONFLICT) {
        throw new ToManyGameForUserException(error)
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
    const startDatetime = TimezoneHelper.toUTC(details.startDatetime)
    const endDatetime = TimezoneHelper.toUTC(details.endDatetime)

    return {
      type: details.type,
      address: details.address,
      min_player: details.playersAmountRange[0],
      max_player: details.playersAmountRange[1],
      start_datetime: startDatetime,
      end_datetime: endDatetime
    }
  }
}

export default GameService
