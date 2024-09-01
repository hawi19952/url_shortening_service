import { down, db } from './schema.js';
down(db).then(() => console.log(`DB is Down`));
