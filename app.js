//carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')
//configurações
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({defautLayout: 'main'}))
    app.set('view engine', 'handlebars');
    //moongose
        mongoose.connect('mongodb://localhost/blogapp').then((req, res) => {
            console.log('Conectado c o Mongo')
        }).catch((err) => {
            console.log('Erro de conexão: ',err)
        })
    //Public
        app.use(express.static(path.join(__dirname,'public')))
//rotas
    app.get('/', (req, res) => {
        res.send('page principal')
    })
    app.get('/posts', (req, res) => {
        res.send('page de posts')
    })
    app.use('/admin', admin)
//outros
const PORT = 8082
app.listen(PORT,() => {
    console.log('servidor rodando!');
})