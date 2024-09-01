import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';
const { DB_HOST, DB_PASS, DB_USER, DB_PORT } = process.env;
const dialect = new MysqlDialect({
    pool: createPool({
        database: 'url_shortner',
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        port: Number(DB_PORT),
        connectionLimit: 10
    })
});
const db = new Kysely({
    dialect
});
// init database if not exists
async function up(db) {
    await db.schema
        .createTable('url')
        .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
        .addColumn('url', 'varchar(255)', col => col.notNull())
        .addColumn('shortCode', 'varchar(255)', col => col.unique().notNull())
        .addColumn('createdAt', 'varchar(255)')
        .addColumn('updatedAt', 'varchar(255)')
        .execute();
    await db.schema
        .createTable('count')
        .addColumn('shortCode', 'varchar(255)')
        .addColumn('createdAt', 'varchar(255)')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('url').execute();
    await db.schema.dropTable('count').execute();
}
export { up, down, db, };
