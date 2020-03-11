const { pick } = require('ramda')

const fields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company', 'todos', 'posts']

module.exports = {
  one: pick(fields)
}
