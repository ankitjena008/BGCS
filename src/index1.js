const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile(__dirname + '/template.html'))
app.get('/candidate', (req, res) => res.send('FAIRIES!!!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
