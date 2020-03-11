const {map, assoc} = require('ramda')
const comments = require('../microservices/comments')
const todos = require('../microservices/todos')
const posts = require('../microservices/posts')

const last5 = (todos) => {
  return todos.slice(Math.max(todos.length - 5, 0))
}

const last10 = (posts) => {
  return posts.slice(Math.max(posts.length - 10, 0))
}

const last5comments = (comments) => {
  return comments.slice(Math.max(comments.length - 5, 0))
}

const get_todos = (qs, user) => {
  return todos(qs)
    .then(todos => last5(todos))
    .then(todos => assoc('todos', todos, user))
}

const get_posts_and_comments = (qs, todos) => {
  return posts(qs)
    .then(posts => last10(posts))
    .then((posts => Promise.all(map((post => {
        // console.log(post)
        return comments({postId: post.id})
          .then(comments => {
            // console.log(comments)
            return last5comments(comments)
          })
          .then((comments) =>
            assoc('comments', comments, post))
      }))
      (posts))
    ))
    .then((comments) =>
      assoc('posts', comments, todos))
}

module.exports = {
  get_todos,
  get_posts_and_comments
}