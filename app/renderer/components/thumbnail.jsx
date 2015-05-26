import React from 'react'
import remote from 'remote'
import time from '../stores/time'
import today from '../stores/today'
import wallpaper from '../stores/wallpaper'

class Thumbnail extends React.Component {
  constructor () {
    super()
    this.downloadPhoto = this.downloadPhoto.bind(this)
    this.setAsWallpaper = this.setAsWallpaper.bind(this)
  }
  setAsWallpaper (evnt) {
    wallpaper.setWallpaper(this.props.entry._id)
  }
  downloadPhoto (evnt) {
    today.download(this.props.entry.date)
  }
  render () {
    let entry = this.props.entry
    let wallpaperPath = remote.getGlobal('paths').wallpaperPath
    if (entry._id) {
      let imagePath = 'file:///' + wallpaperPath + '/' + entry._id + '.jpg'
      return (
        <div className='entry' onClick={this.setAsWallpaper}>
          <span className='date'>{entry.date}</span>
          <img className='thumbnail' src={imagePath} />
        </div>
      )
    } else {
      return (
        <div className='entry' onClick={this.downloadPhoto}>
          <span className='date'>{entry.date}</span>
        </div>
      )
    }
  }
}

Thumbnail.displayName = 'Thumbnail'

export default Thumbnail
