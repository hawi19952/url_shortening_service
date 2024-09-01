import { up, db } from './schema.js'


up(db).then(() => console.log(`DB is up`))
