'use strict'

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var unhandled = require('../')

describe('Rill/Unhandled', function () {
  it('should handle unhandled requests.', function () {
    var request = agent(
      Rill()
        .get(unhandled(({ res }) => {
          res.body = '404'
        }))
        .get('/test-body', ({ res }) => {
          res.body = 'test'
        })
        .get('/test-status', ({ res }) => {
          res.status = 200
        })
        .get('/test-location', ({ res }) => {
          res.set('Location', '/')
        })
        .get('/test-content-type', ({ res }) => {
          res.set('Content-Type', 'text/html')
        })
        .listen()
    )

    return Promise.all([
      request
        .get('/')
        .expect(200)
        .expect(({ text }) => assert.equal(text, '404')),
      request
        .get('/test-body')
        .expect(200)
        .expect(({ text }) => assert.equal(text, 'test')),
      request
        .get('/test-status')
        .expect(200)
        .expect(({ text }) => assert.equal(text, '')),
      request
        .get('/test-location')
        .redirects(0)
        .expect(302)
        .expect('Location', '/')
        .expect(({ text }) => assert.equal(text, '')),
      request
        .get('/test-content-type')
        .expect(404)
        .expect(({ text }) => assert.equal(text, ''))
    ])
  })
})
