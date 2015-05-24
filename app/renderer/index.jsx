/* global document */
import React from 'react'
import MainWindow from './main-window.jsx'

export default () => {
  React.render(
    <MainWindow />,
    document.getElementById('main-mount')
  )
}
