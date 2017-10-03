var express = require('express')
var router = express.Router()
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Profiles = require('../models/profiles')

// profiles
router.get('/',  (req, res) =>{
  renderProfiles(req, res,'')
})

function renderProfiles(req, res,errorMsg){
  Profiles.selectAll((dataRows , dataContacts)=>{
    res.render('profiles' , { dataRows:dataRows , dataContacts : dataContacts , errorMsg : errorMsg } )
  })
}

router.post('/',  (req,res)=> {
  Profiles.insertNew( req.body.username , req.body.password ,req.body.selectContact , err =>{
    if(err){
      renderProfiles(req, res,'Error : Data Contact sudah ada sebelumnya')
    } else{
      res.redirect('profiles')
    }
  } )
})

router.get('/edit/:id' , (req,res)=>{
  Profiles.selectBy ('id' , req.params.id , rows=>{
    res.render('profiles_edit', { dataRows : rows })
  })
})

router.post('/edit/:id' , (req , res) =>{
  Profiles.editID( req.body.username,req.body.password , ()=>{
    res.redirect('../../profiles')
  } )
})

router.get('/delete/:id' , (req,res)=>{
  Profiles.selectBy ('id' , req.params.id , rows=>{
    res.render('profiles_delete', { dataRows : rows })
  })
})

router.post('/delete/:id', (req,res)=>{
  Profiles.deleteID( ()=> {
    res.redirect('../../profiles')
  })
})

module.exports = router;
