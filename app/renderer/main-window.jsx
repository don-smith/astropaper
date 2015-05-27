import React from 'react'
import MainContent from './components/main-content.jsx'

class MainWindow extends React.Component {

  render () {
    return (
      <div id='main-window'>
        <div id='main-content-region'>
          <MainContent />
        </div>
      </div>
    )
  }

}

MainWindow.displayName = 'MainWindow'

export default MainWindow
