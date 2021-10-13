import moment from 'moment'
import DatetimeConstants from '@/constants/datetime.constants'

class GameData {
  constructor (game) {
    this.uuid = game.uuid
    this.address = game.details.address
    this.minPlayer = game.details.min_player
    this.maxPlayer = game.details.max_player
    this.startDatetime = game.details.start_datetime
    this.endDatetime = game.details.end_datetime
  }

  getStartFormatted () {
    return moment(this.startDatetime).format(DatetimeConstants.DatetimeFormat)
  }

  getEndFormatted () {
    return moment(this.endDatetime).format(DatetimeConstants.DatetimeFormat)
  }
}

export { GameData }
