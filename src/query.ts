import { CompiledQuery, Kysely, sql } from "kysely"
import { db } from "./schema.js"
import { now, makeShortCode } from "./helpers.js"

let maxId: number | undefined; 

async function findUrl(shortCode: string) {
  return await db.selectFrom('url')
    .where('shortCode', '=', shortCode)
    .selectAll()
    .executeTakeFirst()
}

async function getMaxId() {
  const res = await db.selectFrom('url')
    .select('id')
    .orderBy('id', 'desc')
    .limit(1)
    .executeTakeFirst();
  if(!res) {
      return 
    }
  return res.id;
}

async function createUrl(url:string) {
  if(!maxId) { //TODO: Move logic to helper, no place for it here 
    const dbMax = await getMaxId()
    if(!dbMax) {
      maxId = 0;
    } else { 
      maxId = dbMax;
    }
  }
  const shortCode = await makeShortCode(maxId); 
  maxId++;
  const createdAt = new Date();
  const inserted = await db.insertInto('url').values({
    shortCode,
    url,
    createdAt: now(),
    updatedAt: now()
  }).executeTakeFirstOrThrow();

  if(!inserted) {
    throw new Error(`Couldn't insert ${url} to generate a new short link`)
  }
  return Url.findUrl(shortCode)
}

async function deleteUrl(shortCode: string) {
  return await db.deleteFrom('url')
    .where('shortCode', '=', shortCode)
    .executeTakeFirst();
}

async function updateUrl(shortCode: string, newUrl: string) {
  const updated = await db.updateTable('url')
    .set({
      updatedAt: now(),
      url: newUrl
    })
    .where('shortCode', '=', shortCode)
    .executeTakeFirst()
    if(!updated) {
      throw new Error(`Couldn't update ${shortCode} with ${newUrl}`)
    }
    return Url.findUrl(shortCode);
}

async function addCount (shortCode: string) {
  return await db.insertInto('count').values({
    shortCode,
    createdAt: now()
  }).execute();
}

async function getCount (shortCode: string) {
  const {rows} = await sql
    .raw(`select count(shortCode) from count where shortCode = '${shortCode}'`)
    .execute(db);
  return rows[0]["count(shortCode)"];
}

const Url = {
  findUrl,
  getMaxId,
  createUrl,
  deleteUrl,
  updateUrl
}

const Count = {
  getCount,
  addCount
}

export { 
  Url,
  Count
}