function initUserInfo () {
  let s = localStorage.getItem('userInfo')
  if (s) {
    return JSON.parse(s)
  }
  return {}
}
const state = {
  httpErr: {
    hasErr: false,
    status: '',
    statusText: ''
  },
  userInfo: initUserInfo()
}
export default state
