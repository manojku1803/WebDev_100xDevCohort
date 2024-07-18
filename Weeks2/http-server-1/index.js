const express = require('express')
const port = 3002
const app = express()

app.get('/', (req, res) =>{
    res.send('Welcome')
})

app.post('/conversation', (req, res) =>{
    console.log(req.headers)
    console.log(req.body)
    res.send({
        msg: "2 * 2 = 4"
    })
})

app.listen(port)