import fs from 'fs'
import _ from 'lodash'
import http from 'http'
import apod from 'apod'
import time from './time'
import remote from 'remote'
import moment from 'moment'
import resized from 'resized'
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

  fillIn (entries, callback) {
    if (!entries) throw {message: 'Argument null exception'}

    db.find({}, function (err, docs) {
      let filledIn = entries.map(function (entry) {
        let existing = _.find(docs, {date: entry.date})
        return existing ? existing : entry
      })
      callback(err, filledIn)
    })
  },

  setWallpaper (id) {
    let path = remote.getGlobal('paths').userDataPath + '/wallpapers'
    let script = `tell application "Finder" to set desktop picture to POSIX file "${path}/${id}.jpg"`
    applescript.execString(script, function (err) {
      if (err) {
        console.error(err)
        return
      }
    })
  },

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
