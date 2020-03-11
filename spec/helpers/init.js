// const user_role_admin = {
//   id: 1,
//   username: 'admin@gmail.com',
//   role: 'ROLE_ADMIN',
// }
// const user_role_user = {
//   id: 2,
//   username: 'user@gmail.com',
//   role: 'ROLE_USER',
// }

//
// mock('../../src/microservices/auth', (token) => {
//   if (token === 'admin') {
//     return Promise.resolve(user_role_admin)
//   }
//   if (token === 'user') {
//     return Promise.resolve(user_role_user)
//   }
// })

const { user, todos, posts, comments} = require('./user-data')

const mock = require('mock-require')

mock('../../src/microservices/user', (id) => {
  if (id == 1) {
    return Promise.resolve(user)
  }
  return Promise.reject({status: 404, message: 'Not Found'})
})

mock('../../src/microservices/todos', (qs) => {

  if (qs.userId == 1) {
    return Promise.resolve(todos)
  }
})

mock('../../src/microservices/posts', (qs) => {
    return Promise.resolve(posts)
})

mock('../../src/microservices/comments', (qs) => {
    return Promise.resolve(comments)
})

