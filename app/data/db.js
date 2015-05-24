import DataStore from 'nedb'

var dbPath = './entries.db'

var db = new DataStore({
  filename: dbPath,
  autoload: true
})

export default db
