require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT


/** master data */
app.get('/master/produtcs', (req, res) => {
  res.send('Hello World!')
})

/** main API */
app.get('/order', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Kanemu listening at http://localhost:${port}`)
})