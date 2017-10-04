var express = require('express')
var router = express.Router()
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Groups = require('../models/groups')
const Contacts_Groups = require('../models/contacts_groups')
const Contacts = require('../models/contacts')




// groups
// router.get('/', (req, res) => {
//   Groups.selectAll().then((rows)=>{
//     res.render('groups', { dataGroups: rows })
//   })
// })

router.get('/', (req, res) => {
  Promise.all([
    Groups.selectAll(),
    Contacts_Groups.selectAll(),
    Contacts.selectAll()
  ]).then(values=>{
    values[0].forEach(groups=>{
      groups.member=[]
      values[1].forEach(conj=>{
        values[2].forEach(contacts=>{
          if(groups.id==conj.groupsID && conj.contactsID==contacts.id){
            groups.member.push(contacts.name)
          }
        })
      })
    })
    res.render('groups', { dataGroups: values[0] })
  })
})


router.post('/', (req, res) => {
  Groups.insertNew(req.body.name_of_group).then((newID)=>{
    res.redirect('groups')
  })
})

router.get('/assign/:id', (req, res) => {
  Promise.all([
    Groups.selectBy('id',req.params.id),
    Contacts.selectAll(),
  ]).then((values)=>{
    res.render('groups_assign', {  dataContacts: values[1] , dataGroups : values[0] })
  })
})

router.post('/assign/:id', (req, res) => {
  console.log(req.body.selectContact , req.params.id);
  Contacts_Groups.insertNew( req.body.selectContact , req.params.id).then(newID=>{
      res.redirect('../../groups')
  })
})

router.get('/edit/:id', (req, res) => {
  Groups.selectBy('id', req.params.id).then((rows)=>{
    res.render('groups_edit', {
      dataGroups: rows
    })
  })
})


router.post('/edit/:id', (req, res) => {
  Groups.editID(req.body.name_of_group).then(()=>{
    res.redirect('../../groups')
  })
})

router.get('/delete/:id', (req, res) => {
  Groups.selectBy('id', req.params.id).then(rows=>{
    res.render('groups_delete', {
      dataGroups: rows
    })
  })
})

router.post('/delete/:id', (req, res) => {
  Groups.deleteID(req.params.id).then(()=>{
    res.redirect('../../groups')
  })
})

module.exports = router;
