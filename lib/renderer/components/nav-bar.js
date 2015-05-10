import React from 'react'

class NavBar extends React.Component {
  render () {
    return (
      <div className='nav-bar'>
        <div>browse</div>
        <div>set</div>
        <div>view</div>
        <div>settings</div>
      </div>
    )
  }
}

NavBar.displayName = 'NavBar'

export default NavBar
