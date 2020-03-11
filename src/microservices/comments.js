/* eslint-disable prefer-promise-reject-errors */
const request = require('request')
const config = require('config')

module.exports = (qs) => new Promise((resolve, reject) => {
  request({
    uri: config.endpoints.typicode + 'comments',
    method: 'GET',
    json: true,
    qs: qs
  }, (err, response) => {
    // console.log(response.body)
    if (err || response.statusCode >= 400) {
      return resolve([])
    }
    return resolve(response.body)
  })
})
