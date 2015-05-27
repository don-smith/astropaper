import React from 'react'
import remote from 'remote'
import wallpaper from '../stores/wallpaper'

class Thumbnail extends React.Component {

  constructor () {
    super()
    this._bind('_downloadPhoto', '_setAsWallpaper')
  }

  _setAsWallpaper (evnt) {
    wallpaper.setWallpaper(this.props.entry._id)
  }

  _downloadPhoto (evnt) {
    let self = this
    wallpaper.download(this.props.entry.date, function () {
      self.props.ondownload()
    })
  }

  _bind (...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this))
  }

  render () {
    let entry = this.props.entry
    let wallpaperPath = remote.getGlobal('paths').wallpaperPath
    if (entry._id) {
      let imagePath = 'file:///' + wallpaperPath + '/' + entry._id + '.jpg'
      let imagePathStyle = {backgroundImage: `url("${imagePath}")`}
      return (
        <div className='entry' onClick={this._setAsWallpaper} style={imagePathStyle} >
          <span className='date'>{entry.date}</span>
        </div>
      )
    } else {
      return (
        <div className='entry' onClick={this._downloadPhoto}>
          <span className='date'>{entry.date}</span>
        </div>
      )
    }
  }

}

Thumbnail.displayName = 'Thumbnail'

export default Thumbnail
