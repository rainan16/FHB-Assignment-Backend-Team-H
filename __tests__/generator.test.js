/* eslint-disable no-undef */
const generateId = require('../generator.js')
const notesData = require('../notesData.js')

test('generateId', () => {
  expect(generateId(notesData[0])).toBe(1)
})
