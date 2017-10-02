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

// const Setup = require('./setup.js')
// let setup= new Setup()
// setup.createTable()

app.get('/', (req,res)=>{
  res.redirect('/index')
})

app.get('/index', (req,res)=>{
  res.render('index')
})

// contacts
app.get('/contacts',  (req, res) =>{
  db.all('SELECT * FROM Contacts', (err,rows)=> {
    req.contacts = rows
    db.all('select * from groups' , (err,rows)=>{
      res.render('contacts' , { dataContacts:req.contacts , dataGroups : rows} )
    })
  })
})

app.post('/contacts',  (req,res)=> {
  db.all(`insert into contacts values( null , '${req.body.name}' , '${req.body.company}' , '${req.body.telp_number}' , '${req.body.email}'  )` , function(err){
    if(err){
      console.log(err);
    } else{
      db.all(`select max(id) maxid from Contacts`, (err,rows)=>{
        db.all(`insert into Contacts_Groups values (null , '${rows[0].maxid}','${req.body.selectGroup}')`, (err,rows)=>{
          res.redirect('contacts')
        })
      })
    }
  })
})

app.get('/contacts/edit/:id' , (req,res)=>{
  db.all(`select * from contacts where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('contacts_edit', { dataContacts : rows })
    }
  })
})


app.post('/contacts/edit/:id' , (req , res) =>{
  db.all(`update contacts set name='${req.body.name}' , company = '${req.body.company}' , telp_number='${req.body.telp_number}', email = '${req.body.email}' where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    } else{
      res.redirect('../../contacts')
    }
  })
})

app.get('/contacts/delete/:id' , (req,res) => {
  db.all(`select * from contacts where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('contacts_delete' , { dataContacts : rows })
    }
  })
})

app.post('/contacts/delete/:id', (req,res)=>{
  db.all(`delete from contacts where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('../../contacts')
    }
  })
})

// groups
app.get('/groups',  (req, res)=> {
  db.all('SELECT * FROM Groups', (err,rows)=> {
    res.render('groups' , { dataGroups:rows} )
  })
})

app.post('/groups',  (req,res)=> {
  db.all(`insert into Groups values( null , '${req.body.name_of_group}'   )` , function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('groups')
    }
  })
})

app.get('/groups/edit/:id' , (req,res)=>{
  db.all(`select * from groups where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('groups_edit', { dataGroups : rows })
    }
  })
})


app.post('/groups/edit/:id' , (req , res) =>{
  db.all(`update groups set name_of_group='${req.body.name_of_group}' where id='${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    } else{
      res.redirect('../../groups')
    }
  })
})

app.get('/groups/delete/:id' , (req,res) => {
  db.all(`select * from groups where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('groups_delete' , { dataGroups : rows })
    }
  })
})

app.post('/groups/delete/:id', (req,res)=>{
  db.all(`delete from groups where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('../../groups')
    }
  })
})

// addresses
app.get('/addresses',  (req, res) =>{
  db.all('SELECT a.*,b.name as contactName FROM addresses a left join contacts b on a.contactID = b.id', (err,rows)=> {
    req.addresses = rows
    db.all('select * from Contacts' , (err,rows)=>{
      req.contacts = rows
      res.render('addresses' , { dataRows:req.addresses , dataContacts : req.contacts   } )
    })
  })
})

app.post('/addresses',  (req,res)=> {
  db.all(`insert into addresses values( null , '${req.body.street}' , '${req.body.city}' , '${req.body.zipcode}' , '${req.body.selectContact}'  )` , function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('addresses')
    }
  })
})

app.get('/addresses/contact/:id' , (req,res)=>{
  db.all(`select * from contacts where id= '${req.params.id}' ` , (err,rows)=>{
    req.dataContacts  = rows
    db.all(`select a.*,b.name from addresses a join contacts b on a.contactID = b.id where b.id= '${req.params.id}' `, (err,rows)=>{
      res.render('addresses_contact' , { dataContacts : req.dataContacts , dataAddress : rows } )
    })
  })
})

app.post('/addresses/contact/:id' ,(req,res)=>{
  db.all(`insert into addresses values( null , '${req.body.street}' , '${req.body.city}' , '${req.body.zipcode}' , '${req.params.id}'  )` , function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('../../addresses')
    }
  })
})

app.get('/addresses/edit/:id' , (req,res)=>{
  db.all(`select * from addresses where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('addresses_edit', { dataRows : rows })
    }
  })
})

app.post('/addresses/edit/:id' , (req , res) =>{
  db.all(`update addresses set street='${req.body.street}' , city = '${req.body.city}' , zipcode='${req.body.zipcode}' where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    } else{
      res.redirect('../../addresses')
    }
  })
})

app.get('/addresses/delete/:id' , (req,res) => {
  db.all(`select * from addresses where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('addresses_delete' , { dataRows : rows })
    }
  })
})

app.post('/addresses/delete/:id', (req,res)=>{
  db.all(`delete from addresses where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('../../addresses')
    }
  })
})

// profiles
app.get('/profiles',  (req, res) =>{
  renderProfiles(req, res,'')
})

function renderProfiles(req, res,errorMsg){
  db.all('SELECT a.*,b.name FROM profiles a join contacts b on a.contactID = b.id ', (err,rows)=> {
    req.profiles = rows
    db.all('select * from Contacts' , (err,rows)=>{
      req.contacts = rows
      res.render('profiles' , { dataRows:req.profiles , dataContacts : req.contacts , errorMsg : errorMsg } )
    })
  })
}


app.post('/profiles',  (req,res)=> {
  db.all(`insert into profiles values( null , '${req.body.username}' , '${req.body.password}' ,'${req.body.selectContact}' )` , function(err){
    if(err){
      renderProfiles(req, res,'Error : Data Contact sudah ada sebelumnya')
    } else{
      res.redirect('profiles')
    }
  })
})

app.get('/profiles/edit/:id' , (req,res)=>{
  db.all(`select * from profiles where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('profiles_edit', { dataRows : rows })
    }
  })
})

app.post('/profiles/edit/:id' , (req , res) =>{
  db.all(`update profiles set username='${req.body.username}' , password = '${req.body.password}' where id = '${req.params.id}'`,(err,rows)=>{
    if(err){
      console.log(err);
    } else{
      res.redirect('../../profiles')
    }
  })
})

app.get('/profiles/delete/:id' , (req,res) => {
  db.all(`select * from profiles where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('profiles_delete' , { dataRows : rows })
    }
  })
})

app.post('/profiles/delete/:id', (req,res)=>{
  db.all(`delete from profiles where id='${req.params.id}'`, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else{
      res.redirect('../../profiles')
    }
  })
})
app.listen(3000,  ()=> {
  console.log('Example app listening on port 3000!')
})
