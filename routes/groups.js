var express = require('express')
var router = express.Router()
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

const Groups = require('../models/groups')


// groups
router.get('/',  (req, res)=> {
  Groups.selectAll(rows=>{
    res.render('groups' , { dataGroups:rows} )
  })
  // db.all('SELECT * FROM Groups', (err,rows)=> {
  //   res.render('groups' , { dataGroups:rows} )
  // })
})

router.post('/',  (req,res)=> {
  Groups.insertNew( ( err,id )=>{
    res.redirect('groups')
  })
  db.all(`insert into Groups values( null , '${req.body.name_of_group}'   )` , function(err){
  //   if(err){
  //     console.log(err);
  //   } else{
  //     res.redirect('groups')
  //   }
  // })
})

router.get('/edit/:id' , (req,res)=>{
  Groups.selectBy('id' , req.params.id , rows=>{
    res.render('groups_edit', { dataGroups : rows })
  } )
  // db.all(`select * from groups where id = '${req.params.id}'`,(err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.render('groups_edit', { dataGroups : rows })
  //   }
  // })
})


router.post('/edit/:id' , (req , res) =>{
  Groups.editID( req.body.name_of_group , ()=>{
    res.redirect('../../groups')
  })
  // db.all(`update groups set name_of_group='${req.body.name_of_group}' where id='${req.params.id}'`,(err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   } else{
  //     res.redirect('../../groups')
  //   }
  // })
})

router.get('/delete/:id' , (req,res) => {
  Groups.selectBy('id',req.params.id, rows=>{
    res.render('groups_delete' , { dataGroups : rows })
  })
  // db.all(`select * from groups where id='${req.params.id}'`, (err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.render('groups_delete' , { dataGroups : rows })
  //   }
  })
})

router.post('/delete/:id', (req,res)=>{
  Groups.deleteID( ()=>{
    res.redirect('../../groups')
  })
  // db.all(`delete from groups where id='${req.params.id}'`, (err,rows)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     res.redirect('../../groups')
  //   }
  // })
})

module.exports = router;
