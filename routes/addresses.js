var express = require('express')
var router = express.Router()
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Addresses = require('../models/addresses')
const Contacts = require('../models/contacts')


// addresses
router.get('/',  (req, res) =>{
  Promise.all([
    Addresses.selectAll(),
    Contacts.selectAll()
  ]).then((values)=>{
    values[0].forEach((address)=>{
      values[1].forEach((contact)=>{
        if (address.contactID==contact.id){
          address.name = contact.name
        }
      })
    })
    res.render('addresses' , { dataRows:values[0] , dataContacts : values[1] } )
  })
})

router.post('/',  (req,res)=> {
  Addresses.insertNew( req.body.street , req.body.city , req.body.zipcode, req.body.selectContact ).then((id)=>{
    res.redirect('addresses')
  })
})



//
// router.get('/contact/:id' , (req,res)=>{
//   db.all(`select * from contacts where id= '${req.params.id}' ` , (err,rows)=>{
//     req.dataContacts  = rows
//     db.all(`select a.*,b.name from addresses a join contacts b on a.contactID = b.id where b.id= '${req.params.id}' `, (err,rows)=>{
//       res.render('addresses_contact' , { dataContacts : req.dataContacts , dataAddress : rows } )
//     })
//   })
// })
//
// router.post('/contact/:id' ,(req,res)=>{
//   db.all(`insert into addresses values( null , '${req.body.street}' , '${req.body.city}' , '${req.body.zipcode}' , '${req.params.id}'  )` , function(err){
//     if(err){
//       console.log(err);
//     } else{
//       res.redirect('../../addresses')
//     }
//   })
// })

router.get('/edit/:id' , (req,res)=>{
  Addresses.selectBy ( 'id' , req.params.id ).then((rows)=>{
    res.render('addresses_edit', { dataRows : rows })
  })
})


router.post('/edit/:id' , (req , res) =>{
  Addresses.editID ( req.params.id,req.body.street , req.body.city , req.body.zipcode).then(()=>{
    res.redirect('../../addresses')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Addresses.selectBy ( 'id' , req.params.id).then((rows)=>{
    res.render('addresses_delete', { dataRows : rows })
  })
})

router.post('/delete/:id', (req,res)=>{
  Addresses.deleteID(req.params.id).then(()=>{
    res.redirect('../../addresses')
  })
})

module.exports = router;
