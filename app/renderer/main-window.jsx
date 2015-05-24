'use babel'

import React from 'react'
import db from '../data/db'
import NavBar from './components/nav-bar.jsx'
import MainContent from './components/main-content.jsx'

class MainWindow extends React.Component {
  constructor () {
    super()
    db.find({key: 'nav'}, function (err, navs) {
      if (err) console.log(err)
      if (!navs || navs.length === 0) {
        console.log('not inserted')
        db.insert({
          key: 'nav',
          items: ['foo', 'bar', 'baz']
        })
      }
    })
  }
  render () {
    return (
      <div id='main-window'>
        <nav>
          <NavBar />
        </nav>
        <div id='main-content-region'>
          <MainContent />
        </div>
      </div>
    )
  }
}

MainWindow.displayName = 'MainWindow'

export default MainWindow
