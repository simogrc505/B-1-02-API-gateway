/* eslint-disable prefer-promise-reject-errors */
const request = require('request')
const config = require('config')

module.exports = (qs) => new Promise((resolve, reject) => {
  request({
    uri: config.endpoints.typicode + 'posts',
    method: 'GET',
    json: true,
    qs: qs
  }, (err, response) => {
    if (err || response.statusCode >= 400) {
      return resolve([])
    }

    return resolve(response.body)
  })
})
