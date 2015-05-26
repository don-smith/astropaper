import remote from 'remote'
import applescript from 'applescript'

export default {
  setWallpaper (id) {
    let path = remote.getGlobal('paths').userDataPath + '/wallpapers'
    let script = `tell application "Finder" to set desktop picture to POSIX file "${path}/${id}.jpg"`
    applescript.execString(script, function (err) {
      if (err) {
        console.error(err)
        return
      }
    })
  }
}
