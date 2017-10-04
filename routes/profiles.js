var express = require('express')
var router = express.Router()
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Profiles = require('../models/profiles')
const Contacts = require('../models/contacts')


// profiles
router.get('/',  (req, res) =>{
  renderProfiles(req, res,'')
})

function renderProfiles(req, res,errorMsg){
  Promise.all([
    Profiles.selectAll() ,
    Contacts.selectAll()
  ]).then((values)=>{
    values[0].forEach((profile)=>{
      values[1].forEach((contact)=>{
        if (profile.contactID==contact.id){
          profile.name = contact.name
        }
      })
    })
    res.render('profiles' , { dataRows:values[0] , dataContacts : values[1] , errorMsg : '' })
  })
}

router.post('/',  (req,res)=> {
  Profiles.insertNew( req.body.username , req.body.password ,req.body.selectContact).then(()=>{
    res.redirect('profiles')
  }).catch(()=>{
    renderProfiles(req, res,'Error : Data Contact sudah ada sebelumnya')
  })

})

router.get('/edit/:id' , (req,res)=>{
  Profiles.selectBy ('id' , req.params.id ).then((rows)=>{
    res.render('profiles_edit', { dataRows : rows })
  })
})

router.post('/edit/:id' , (req , res) =>{
  Profiles.editID( req.params.id,req.body.username,req.body.password).then(()=>{
    res.redirect('../../profiles')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Profiles.selectBy ('id' , req.params.id ).then((rows)=>{
    res.render('profiles_delete', { dataRows : rows })
  })
})


router.post('/delete/:id', (req,res)=>{
  Profiles.deleteID(req.params.id).then(()=>{
    res.redirect('../../profiles')
  })
})

module.exports = router;
