import React from 'react'
import remote from 'remote'
import time from '../stores/time'
import Thumbnail from './thumbnail'
import wallpaper from '../stores/wallpaper'

class MainContent extends React.Component {

  constructor () {
    super()
    this.state = {entries: ['loading']}
    this._wallpaperDownloaded = this._wallpaperDownloaded.bind(this)
  }

  componentDidMount () {
    let self = this
    let days = []
    for (var i = 1; i < 30; i++) {
      days.push({date: time.daysAgo(i, time.format)})
    }
    wallpaper.mergeWallpapers(days, function (err, entries) {
      if (err) console.error(err)
      self.setState({entries: entries})
    })
  }

  _wallpaperDownloaded () {
    this.componentDidMount()
  }

  render () {
    let self = this
    let entries = this.state.entries.map(function (entry) {
      if (!entry) return
      return <Thumbnail entry={entry} ondownload={self._wallpaperDownloaded} />
    })
    return (
      <div className='main-content'>
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
