import remote from 'remote'
import DataStore from 'nedb'

var paths = remote.getGlobal('paths')
var dbPath = paths.userDataPath + '/entries.db'

var db = new DataStore({
  filename: dbPath,
  autoload: true
})

export default db
