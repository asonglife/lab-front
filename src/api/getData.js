import service from 'api/service.js'

export function getData(apiRoute) {
    return service({
        url: apiRoute,
        method: 'get'
    })
}

export function sendData(apiRoute, sentData) {
    return service({
        url: apiRoute,
        method: 'post',
        data: sentData
    })
}