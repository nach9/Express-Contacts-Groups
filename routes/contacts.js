var express = require('express')
var router = express.Router()

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Contacts = require('../models/contacts')

// const contacts = new Contacts

// contacts
router.get('/',  (req, res) =>{ //orm done
  Contacts.selectAll((dataContacts , dataGroups)=>{
  res.render('contacts' , { dataContacts:dataContacts , dataGroups : dataGroups} )
  })
})

router.post('/',  (req,res)=> {
  Contacts.insertNew(req.body.name , req.body.company , req.body.telp_number , req.body.email , (result,lastID)=>{
    res.redirect('contacts')
  })
  // db.all(`insert into contacts values( null , '${req.body.name}' , '${req.body.company}' , '${req.body.telp_number}' , '${req.body.email}'  )` , function(err){
  //   if(err){
  //     console.log(err);
  //   } else{
  //     db.all(`select max(id) maxid from Contacts`, (err,rows)=>{
  //       db.all(`insert into Contacts_Groups values (null , '${rows[0].maxid}','${req.body.selectGroup}')`, (err,rows)=>{
  //         res.redirect('contacts')
  //       })
  //     })
  //   }
  // })
})

router.get('/edit/:id' , (req,res)=>{ //orm done
  Contacts.selectBy( 'id', req.params.id , (dataContacts)=>{
    res.render('contacts_edit', { dataContacts : dataContacts })
  })
})

router.post('/edit/:id' , (req , res) =>{ //orm done
  Contacts.editID ( req.body.name , req.body.company ,req.body.telp_number, req.body.email, err =>{
    res.redirect('../../contacts')
  })
})

router.get('/delete/:id' , (req,res) => {
  Contacts.selectBy( 'id', req.params.id , (dataContacts)=>{
    res.render('contacts_delete', { dataContacts : dataContacts })
  })
})

router.post('/delete/:id', (req,res)=>{
  Contacts.deleteID( ()=> {
    res.redirect('../../contacts')
  })
})

module.exports = router;
