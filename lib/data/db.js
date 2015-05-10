import DataStore from 'nedb'

var db = new DataStore({
  filename: './entries.db',
  autoload: true
})

export default db
