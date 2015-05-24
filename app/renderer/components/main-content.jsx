import React from 'react'
import time from '../stores/time'

class MainContent extends React.Component {
  constructor () {
    super()
    this.state = {entries: ['loading']}
  }
  componentDidMount () {
    let entries = []
    for (var i = 1; i < 30; i++) {
      entries.push({date: time.daysAgo(i, time.format)})
    }
    this.setState({entries: entries})
  }
  render () {
    let entries = this.state.entries.map(function (entry) {
      return <div className='entry'>{entry.date}</div>
    })
    return (
      <div className='main-content'>
        <h3>Main Content</h3>
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
