import moment from 'moment-timezone'
import DatetimeConstants from '@/constants/datetime.constants'
import { TimezoneHelper } from '@/helpers/datime.helpers'

class GameData {
  constructor (game) {
    this.uuid = game.uuid
    this.address = game.details.address
    this.minPlayer = game.details.min_player
    this.maxPlayer = game.details.max_player
    this.startDatetime = game.details.start_datetime
    this.endDatetime = game.details.end_datetime
    this.playerLevel = game.details.player_level
    this.format = game.details.format
    this.contact = game.details.contact
    this.comment = game.details.comment
    this.shower = game.location.shower
    this.parking = game.location.parking
    this.dressingRoom = game.location.dressing_room
    this.locker = game.location.locker
    this.fieldType = game.location.field_type
  }

  getStartTimezone () {
    return TimezoneHelper.fromUTC(this.startDatetime)
  }

  getEndTimezone () {
    return TimezoneHelper.fromUTC(this.endDatetime)
  }

  getStartUTC () {
    return moment(this.startDatetime).format(DatetimeConstants.DatetimeFormat)
  }

  getEndUTC () {
    return moment(this.endDatetime).format(DatetimeConstants.DatetimeFormat)
  }
}

export { GameData }
