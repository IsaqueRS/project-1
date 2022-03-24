//carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const moment = require('moment')
//configurações
    //sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
    //body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({defautLayout: 'main', helpers: { formatDate: (date) => { return moment(date).format('DD/MM/YYYY HH:mm')}}}))
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