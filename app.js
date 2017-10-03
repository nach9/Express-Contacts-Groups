//express
const express = require('express')
const app = express()

//sqlite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//ejs
var ejs = require('ejs')
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index = require('./routes/index')
const contacts = require('./routes/contacts')
const groups = require('./routes/groups')
const addresses = require('./routes/addresses')
const profiles = require('./routes/profiles')


app.get('/', (req,res)=>{
  res.redirect('/index')
})

app.use('/index',index)
app.use('/contacts',contacts)
app.use('/groups',groups)
app.use('/addresses',addresses)
app.use('/profiles',profiles)

app.listen(3000,  ()=> {
  console.log('Example app listening on port 3000!')
})
