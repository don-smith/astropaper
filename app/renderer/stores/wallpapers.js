import _ from 'lodash'
import db from '../../data/db'

export default {
  fillIn: function (entries, callback) {
    if (!entries) throw {message: 'Argument null exception'}
    db.find({}, function (err, docs) {
      let filledIn = entries.map(function (entry) {
        let existing = _.find(docs, {date: entry.date})
        return existing ? existing : entry
      })
      callback(err, filledIn)
    })
  }
}
