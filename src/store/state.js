function initUserInfo () {
  let s = localStorage.getItem('userInfo')
  if (s) {
    return JSON.parse(s)
  }
  return {}
}

const state = {
  userInfo: initUserInfo(),
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  expire: localStorage.getItem('expire') ? localStorage.getItem('expire') : '',
  articles: {},
  editflag: false
}
export default state
