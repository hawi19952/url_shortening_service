import ShortUniqueId from "short-unique-id";

function now() {
  const date = new Date().toISOString()
  return date;
}

function makeShortCode(n: number) { //FIX: Logic breaks at 10, it is not doing well 
  const uid = new ShortUniqueId({length: 6});
  return uid.randomUUID();
}


export {
  makeShortCode,
  now
}