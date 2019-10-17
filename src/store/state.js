function initUserInfo () {
  let s = localStorage.getItem('userInfo')
  if (s) {
    return JSON.parse(s)
  }
  return {}
}
const state = {
  isLogin: '0',
  isManager: '0',
  userInfo: initUserInfo(),
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
}
export default state
