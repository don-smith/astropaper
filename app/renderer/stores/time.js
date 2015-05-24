import moment from 'moment'

export default {
  format: 'YYYY-M-D',
  daysAgo: function (num, format) {
    let date = moment().subtract(num, 'days')
    if (format) date = date.format(format)
    return date
  }
}
