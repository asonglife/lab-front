import service from 'api/service.js'
export function postData (apiRoute, sentData) {
  return service({
    url: apiRoute,
    method: 'post',
    data: sentData
  })
}
