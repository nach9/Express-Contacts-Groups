var express = require('express')
var router = express.Router()
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Addresses = require('../models/addresses')

// addresses
router.get('/',  (req, res) =>{
  Addresses.selectAll( (dataRows,dataContacts)=>{
    res.render('addresses' , { dataRows:dataRows , dataContacts : dataContacts } )
  } )
})

router.post('/',  (req,res)=> {
  Addresses.insertNew( req.body.street , req.body.city , req.body.zipcode, req.body.selectContact , (err,id)=>{
    res.redirect('addresses')
  })
})



router.get('/contact/:id' , (req,res)=>{
  db.all(`select * from contacts where id= '${req.params.id}' ` , (err,rows)=>{
    req.dataContacts  = rows
    db.all(`select a.*,b.name from addresses a join contacts b on a.contactID = b.id where b.id= '${req.params.id}' `, (err,rows)=>{
      res.render('addresses_contact' , { dataContacts : req.dataContacts , dataAddress : rows } )
    })
  })
})

router.post('/contact/:id' ,(req,res)=>{
  db.all(`insert into addresses values( null , '${req.body.street}' , '${req.body.city}' , '${req.body.zipcode}' , '${req.params.id}'  )` , function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect('../../addresses')
    }
  })
})

router.get('/edit/:id' , (req,res)=>{
  Addresses.selectBy ( 'id' , req.params.id , rows=>{
    res.render('addresses_edit', { dataRows : rows })
  })
})

router.post('/edit/:id' , (req , res) =>{
  Addresses.editID ( req.body.street , req.body.city , req.body.zipcode, ()=>{
    res.redirect('../../addresses')
  })
})

router.get('/delete/:id' , (req,res)=>{
  Addresses.selectBy ( 'id' , req.params.id , rows=>{
    res.render('addresses_delete', { dataRows : rows })
  })
})

router.post('/delete/:id', (req,res)=>{
  Addresses.deleteID( ()=>{
    res.redirect('../../addresses')
  })

})

module.exports = router;
