const config = require('config')
const cors = require('cors')
const express = require('express')
const pino = require('express-pino-logger')(config.log)
const bodyParser = require('body-parser')
const actions = require('./controllers')
const error_handler = require('./middleware/error-handler')
const ping = require('@wdalmut/ping')
const app = express()

app.use(pino)

app.use(ping({ping_response_body: 'OK'}))
app.use(pino)

app.use(cors({exposedHeaders: ['x-page', 'x-count', 'x-total', 'x-limit', 'x-to', 'x-from']}))
app.use(bodyParser.json({type: 'application/json', limit: '50mb'}))

actions.map((paths) => app.use.apply(app, paths))

app.use(error_handler)

app.listen(process.env.NODE_PORT || 3000)

module.exports = app // for testing
