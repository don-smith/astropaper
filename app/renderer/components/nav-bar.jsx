import React from 'react'
import db from '../../data/db'

class NavBar extends React.Component {
  constructor () {
    super()
    this.state = {items: ['loading']}
  }
  componentDidMount () {
    var self = this
    db.findOne({key: 'nav'}, function (err, navs) {
      if (err) console.log(err)
      if (!navs) return
      self.setState(navs)
    })
  }
  render () {
    var navs = this.state.items.map(function (nav) {
      return <div>{nav}</div>
    })
    return (
      <div className='nav-bar'>
        {navs}
      </div>
    )
  }
}

NavBar.displayName = 'NavBar'

export default NavBar
