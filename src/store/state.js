function initUserInfo () {
  let s = localStorage.getItem('userInfo')
  if (s) {
    return JSON.parse(s)
  }
  return {}
}
const state = {
  isLogin: '0',
  userInfo: initUserInfo(),
  token: ''
}
export default state
