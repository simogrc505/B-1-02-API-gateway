/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* global beforeEach describe it db_init expect */
/* eslint no-undef: 'error' */

const R = require('ramda')
const request = require('supertest')

describe('Userdata action', () => {

  let app

  beforeEach((done) => {
    app = require('../../src')
    done()
  })

  it('should get user', (done) => {
    request(app)
      .get('/v1/user/1/blog')
      .expect(200)
      .end((err, res) => {
         // console.log(res.body)
        if (err) {
          throw err
        }

        expect(R.pick(['id', 'name', 'username', 'email' ], res.body)).toEqual({
          "id": 1,
          "name": "Simona Greco",
          "username": "Simona",
          "email": "Simona@april.biz",
        })

        expect(R.length(R.prop('todos', res.body))).toEqual(5)
        expect(R.length(R.prop('posts', res.body))).toEqual(10)
        done()
      })
  })
})
