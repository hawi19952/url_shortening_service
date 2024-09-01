import ShortUniqueId from "short-unique-id";
function now() {
    const date = new Date().toISOString();
    return date;
}
function makeShortCode(n) {
    const uid = new ShortUniqueId({ length: 6 });
    return uid.randomUUID();
}
export { makeShortCode, now };
