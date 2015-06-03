import React from 'react'
import remote from 'remote'
import time from '../stores/time'
import Thumbnail from './thumbnail'
import wallpaper from '../stores/wallpaper'
import tiles from '../stores/tiles'
import actions from '../actions/actions'
import constants from '../constants/constants'
import dispatcher from '../dispatchers/app-dispatcher'

class MainContent extends React.Component {

  constructor () {
    super()
    let self = this
    this.state = {entries: ['loading']}
    console.log('main-content: registering for finish download')
    dispatcher.register(function (payload) {
      if (payload.actionType === constants.FINISH_DOWNLOAD) {
        console.log('main-content: finishing download')
        self._showTiles()
      }
    })
    this._wallpaperDownloaded = this._wallpaperDownloaded.bind(this)
  }

  componentDidMount () {
    this._showTiles()
  }

  _showTiles () {
    let days = []
    let self = this

    for (var i = 1; i < 30; i++) {
      days.push({date: time.daysAgo(i, time.format)})
    }

    tiles.mergeWallpapers(days)
      .then(self._setNewState.bind(self), console.error)
  }

  _setNewState (entries) {
    this.setState({entries: entries})
  }

  _wallpaperDownloaded () {
    this.componentDidMount()
  }

  render () {
    // let self = this
    let entries = this.state.entries.map(function (entry) {
      if (!entry) return
      return <Thumbnail entry={entry} />
      // return <Thumbnail entry={entry} ondownload={self._wallpaperDownloaded} />
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
