import fs from 'fs'
import http from 'http'
import apod from 'apod'
import time from './time'
import remote from 'remote'
import moment from 'moment'
import apikey from './apikey'
import db from '../../data/db'
import applescript from 'applescript'

var userDataPath = remote.getGlobal('paths').userDataPath
var wallpaperPath = userDataPath + '/wallpapers/'

var saveFile = function (url, name) {
  fs.exists(wallpaperPath, function (exists) {
    if (!exists) {
      fs.mkdir(wallpaperPath, function (err) {
        if (err) {
          console.error(err)
          return
        }
      })
    }
  })
  var file = fs.createWriteStream(wallpaperPath + name)
  http.get(url, function (response) {
    response.pipe(file)
  })
}

export default {
  download (dateString) {
    let date = moment(dateString, time.format)
    let todaysDate = date.format(time.format)
    apod.apiKey = apikey
    apod(date.toDate(), function (err, data) {
      if (err) {
        console.error(err)
        return
      }
      db.findOne({date: todaysDate}, function (err, doc) {
        if (!err && !doc) {
          db.insert(data, function (err, newDoc) {
            if (err) console.error(err)
            saveFile(newDoc.url, newDoc._id + '.jpg')
            console.log(newDoc)
          })
        }
      })
    })
  }
}
