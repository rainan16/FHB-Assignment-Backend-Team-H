const express = require('express');
const generator = require("./generator.js");
const notesData = require("./notesData.js");
const app = express()



app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generator.generateId(notesData),
  }

  notesData = notesData.concat(note)

  response.json(note)
})

app.get('/api/notes', (req, res) => {
  res.json(notesData)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notesData = notesData.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notesData.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
var server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = {app, server};