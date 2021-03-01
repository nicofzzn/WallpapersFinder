global.fetch = require('node-fetch')
require('dotenv').config()
import { createApi } from 'unsplash-js'
import express from 'express'

const unsplash = createApi({
  accessKey: process.env.APPLICATION_ID_2!,
})

const app = express()

app.use(express.json())

app.get('/api/random', (req, res) => {
  unsplash.photos
    .getRandom({
      count: 10,
    })
    .then(photos => res.json(photos.response))
    .catch(err => {
      res.status(500).json(err)
    })
})

app.get('/api/search/:query/:page', (req, res) => {
  const query = req.params.query
  const page = parseInt(req.params.page)
  unsplash.search
    .getPhotos({
      query,
      page,
      perPage: 15,
    })
    .then(photos => {
      res.json(photos.response)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
