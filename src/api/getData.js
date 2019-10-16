import service from 'api/service.js'

export function getData (apiRoute, sentData) {
  return service({
    url: apiRoute,
    method: 'post',
    data: sentData
  })
}
