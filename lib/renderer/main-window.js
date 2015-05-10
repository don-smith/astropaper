import React from 'react'
import NavBar from './components/nav-bar'
import MainContent from './components/main-content'

class MainWindow extends React.Component {
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
