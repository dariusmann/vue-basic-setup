import moment from 'moment-timezone'
import DatetimeConstants from '@/constants/datetime.constants'

const TimezoneHelper = {
  convertToUTCTimezoneAware: function (datetime) {
    const clientTimezone = moment.tz.guess()
    const timezoneDatetime = moment.tz(datetime, clientTimezone)

    return timezoneDatetime.utc().format(DatetimeConstants.DatetimeFormat)
  },
  toUTC: function (datetime) {
    return this.convertToUTCTimezoneAware(datetime)
  },
  fromUTC: function (utcDatetime) {
    const clientTimezone = moment.tz.guess()
    const timezoneDatetime = moment.utc(utcDatetime).tz(clientTimezone)
    return timezoneDatetime.format(DatetimeConstants.DatetimeFormat)
  }
}

export { TimezoneHelper }
