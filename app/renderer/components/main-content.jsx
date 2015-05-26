import React from 'react'
import remote from 'remote'
import time from '../stores/time'
import today from '../stores/today'
import wallpapers from '../stores/wallpapers'
import Thumbnail from './thumbnail'

class MainContent extends React.Component {
  constructor () {
    super()
    this.state = {entries: ['loading']}
  }
  componentDidMount () {
    let self = this
    let entries = []
    for (var i = 1; i < 30; i++) {
      entries.push({date: time.daysAgo(i, time.format)})
    }
    entries = wallpapers.fillIn(entries, function (err, entries) {
      if (err) console.error(err)
      // console.log(entries)
      self.setState({entries: entries})
    })
  }
  setAsWallpaper (evnt) {
    let id = evnt
    wallpapers.setWallpaper(id)
  }
  downloadPhoto (evnt) {
    let date = evnt
    today.download(date)
  }
  render () {
    // let wallpaperPath = remote.getGlobal('paths').wallpaperPath
    let entries = this.state.entries.map(function (entry) {
      if (!entry) return
      return <Thumbnail entry={entry} />
      /*
      if (entry._id) {
        let imagePath = 'file:///' + wallpaperPath + '/' + entry._id + '.jpg'
        return (
          <Thumbnail date={entry.date} image={imagePath} />
          // <div className='entry' onClick={this.setAsWallpaper}>
          //   <span className='date'>{entry.date}</span>
          //   <img className='thumbnail' src={imagePath} />
          // </div>
        )
      } else {
        return (
          <Thumbnail date={entry.date} />
          // <div className='entry' onClick={this.downloadPhoto}>
          //   <span className='date'>{entry.date}</span>
          // </div>
        )
      }
      */
    })
    return (
      <div className='main-content'>
        <h3>Astronomy Wallpapers</h3>
        <div className='entries'>
          <div className='entries-container'>
            {entries}
          </div>
        </div>
      </div>
    )
  }
}

MainContent.displayName = 'MainContent'

export default MainContent
