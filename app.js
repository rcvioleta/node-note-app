const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const noteRoutes = require('./routes/note')

app.use(noteRoutes)

app.listen(port, () => {
    console.log(`Server running on port:${port}`)
})