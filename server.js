
const express = require('express')
const showRequests = require('./showRequests')

const app = express()
const port = process.env.PORT || 3000

app.use(showRequests)
app.use(express.static('public'))
app.use(express.json())

let entries = []

app.get('/api/servers', function (req, res) {
    res.send(entries)
})

app.post('/api/server', function (req, res) {
    const entry = {
        name: req.body.name,
        ip: req.body.ip
    }
    let newIndex = entries.push(entry)
    res.send(newIndex)
})


app.listen(port, () => {
    console.log('Local server listening on port', port)
})
