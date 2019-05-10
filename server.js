const express = require('express')
const path = require('path')

let app = express()

app.use('/static', express.static('./dist/static'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.listen(3000)
