import request from 'api/request'
export function getData (apiRoute) {
  return request({
    url: apiRoute,
    method: 'get'
  })
}
