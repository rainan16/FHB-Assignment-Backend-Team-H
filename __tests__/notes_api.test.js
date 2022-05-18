/* eslint-disable no-undef */
const supertest = require('supertest')
const index = require('../index')
const notes = require('../notesData')

const api = supertest(index.app)

test('returned notes are JSON', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(notes.length)
})

test('find a specific note within all notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(r => r.content)
  expect(contents).toContain(
    'GET and POST are the most important methods of HTTP protocol'
  )
  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
})

afterAll(() => {
  index.server.close()
})
