export function isNullObj (val) {
  for (let key in val) {
    return false
  }
  return true
}
