const { compose, bind, } = require('ramda')

const error = require('../views/error')
const view = require('../views/user')

// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const user = require('../microservices/user')

// UTILITIES
const { get_posts_and_comments, get_todos } = require('../utilities/user')

const get = (req, res) => {
  user(req.params.id)  //ritorna utenti
    .then((user) => get_todos({ userId: req.params.id }, user)) //ritorna i todos dell'utente
    .then((todos) => get_posts_and_comments({ userId: req.params.id }, todos))   //ritorna i post con i commenti
    .then(compose(bind(res.status(200).json, res), view.one))
    .catch(error.generic(res))
}

let users = require('express').Router()

users.get('/:id/blog',
  get
)

module.exports = users
