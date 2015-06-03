import constants from '../constants/constants'
import dispatcher from '../dispatchers/app-dispatcher'

var actions = {

  setWallpaper (id) {
    dispatcher.dispatch({
      actionType: constants.SET_WALLPAPER,
      id: id
    })
  },

  startDownload (date) {
    dispatcher.dispatch({
      actionType: constants.START_DOWNLOAD,
      date: date
    })
  },

  finishDownload () {
    dispatcher.dispatch({
      actionType: constants.FINISH_DOWNLOAD
    })
  }

}

export default actions
