import fs from 'fs'
import http from 'http'
import apod from 'apod'
import time from './time'
import remote from 'remote'
import moment from 'moment'
import apikey from './apikey'
import db from '../../data/db'
import applescript from 'applescript'
import actions from '../actions/actions'
import constants from '../constants/constants'
import dispatcher from '../dispatchers/app-dispatcher'

apod.apiKey = apikey
var userDataPath = remote.getGlobal('paths').userDataPath
var wallpaperPath = userDataPath + '/wallpapers/'

dispatcher.register(function (payload) {
  if (payload.actionType === constants.START_DOWNLOAD) {
    console.log(`starting download for date ${payload.date}`)
    downloadForDate(payload.date)
  }
})

function downloadForDate (dateString) {
  let date = moment(dateString, time.format).toDate()

  getPhotoInfo(date)
    .then(savePhotoData)
    .then(savePhotoToDisk)
    .then(processingSucceeded, processingFailed)

  function processingSucceeded () {
    actions.finishDownload()
  }

  function processingFailed () {
    console.error(`Download for ${dateString} failed`)
  }
}

function getPhotoInfo (date) {
  return new Promise(function (resolve, reject) {
    apod(date, function (err, data) {
      if (err || data.error) {
        reject(data.error)
      } else {
        resolve(data)
      }
    })
  })
}

function savePhotoData (data) {
  return new Promise(function (resolve, reject) {
    db.findOne({date: data.date}, function (err, doc) {
      if (!err && !doc) {
        db.insert(data, function (err, wallpaper) {
          if (err) {
            reject(err)
          } else {
            resolve(wallpaper)
          }
        })
      } else {
        reject(err)
      }
    })
  })
}

function savePhotoToDisk (wallpaper) {
  let filename = wallpaperPath + wallpaper._id + '.jpg'
  return new Promise(function (resolve, reject) {
    // Create the wallpaper path if it doesn't exist
    fs.exists(wallpaperPath, function (exists) {
      if (!exists) {
        fs.mkdir(wallpaperPath, function (err) {
          if (err) reject(err)
        })
      }
    })

    // Save the file
    var file = fs.createWriteStream(filename)
    http.get(wallpaper.url, function (response) {
      response.pipe(file)
      response.on('end', function () {
        resolve()
      })
      response.on('error', function (err) {
        reject(err)
      })
    })
  })
}

var wallpaper = {
  setWallpaper (id) {
    let path = remote.getGlobal('paths').userDataPath + '/wallpapers'
    let script = `tell application "Finder" to set desktop picture to POSIX file "${path}/${id}.jpg"`
    applescript.execString(script, function (err) {
      if (err) {
        console.error(err)
        return
      }
    })
  }
}

export default wallpaper
