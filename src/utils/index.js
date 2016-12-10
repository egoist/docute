export function isType(obj, type) {
  return `[object ${type}]` === Object.prototype.toString.call(obj)
}
