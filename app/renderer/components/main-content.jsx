import React from 'react'
import time from '../stores/time'
import Thumbnail from './thumbnail'
import wallpaper from '../stores/wallpaper'

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
    entries = wallpaper.fillIn(entries, function (err, entries) {
      if (err) console.error(err)
      self.setState({entries: entries})
    })
  }

  render () {
    let entries = this.state.entries.map(function (entry) {
      if (!entry) return
      return <Thumbnail entry={entry} />
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
