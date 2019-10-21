import service from 'api/service.js'
export function postData (apiRoute, sentData, headers) {
  return service({
    url: apiRoute,
    method: 'post',
    data: JSON.stringify(sentData),
    headers: headers
  })
}
