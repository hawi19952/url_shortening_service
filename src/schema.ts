import { createPool } from 'mysql2';
import { ColumnType, DeleteQueryBuilder, Generated, Insertable, Kysely, MysqlDialect, Selectable, sql, Updateable } from 'kysely';

const {
  DB_HOST,
  DB_PASS,
  DB_USER,
  DB_PORT
} = process.env;

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


interface UrlTable {
  id: Generated<number>,
  url: string,
  shortCode: string,
  createdAt: string, //TODO: Turn it into timestamp 
  updatedAt: string
}

interface CountTable {
  shortCode: string,
  createdAt: string,
}

type Url = Selectable<UrlTable>
type newUrl = Insertable<UrlTable>
type urlUpdate = Updateable<UrlTable>

interface Database {
  url: UrlTable
  count: CountTable
}

type Count = Selectable<CountTable>
type newCount = Insertable<CountTable>

const db = new Kysely<Database>({
  dialect
});

// init database if not exists

async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('url')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('url', 'varchar(255)', col => col.notNull())
    .addColumn('shortCode', 'varchar(255)', col => col.unique().notNull())
    .addColumn('createdAt', 'varchar(255)')
    .addColumn('updatedAt', 'varchar(255)')
    .execute()
  
  await db.schema
    .createTable('count')
    .addColumn('shortCode', 'varchar(255)')
    .addColumn('createdAt', 'varchar(255)')
    .execute()
}

async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('url').execute();
  await db.schema.dropTable('count').execute();
}

export {
  up,
  down,
  db,
}