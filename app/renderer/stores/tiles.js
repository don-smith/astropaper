import _ from 'lodash'
import db from '../../data/db'

var tiles = {

  mergeWallpapers (entries) {
    if (!entries) throw {message: 'Argument null exception'}

    let promise = new Promise(function (resolve, reject) {
      db.find({}, function (err, docs) {
        let filledIn = entries.map(function (entry) {
          let existing = _.find(docs, {date: entry.date})
          return existing ? existing : entry
        })
        if (err) {
          reject(err)
        } else {
          resolve(filledIn)
        }
      })
    })

    return promise
  }

}

export default tiles
