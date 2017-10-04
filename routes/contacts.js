var express = require('express')
var router = express.Router()

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('data.db');

const Contacts = require('../models/contacts')
const Groups = require('../models/groups')
const Contacts_Groups = require('../models/contacts_groups')


router.get('/', (req, res) => { //orm done
  Promise.all([
    Contacts.selectAll(),
    Contacts_Groups.selectAll(),
    Groups.selectAll()
  ]).then((values)=>{
    values[0].forEach(contact=>{
      contact.groups=[]
      values[1].forEach(conjunt=>{
        values[2].forEach(group=>{
          if(contact.id==conjunt.contactsID && conjunt.groupsID==group.id){
            contact.groups.push(group.name_of_group)
          }
        })
      })
    })
    console.log( values[0]);
    res.render('contacts', { dataContacts: values[0], dataGroups: values[1] })
  })
})

router.post('/', (req, res) => {
  Contacts.insertNew(req.body.name, req.body.company, req.body.telp_number, req.body.email).then(newID =>{
    Contacts_Groups.insertNew(newID,req.body.selectGroup).then(newID=>{
      res.redirect('contacts')
    })
  })
})

router.get('/edit/:id', (req, res) => { //orm done
  Contacts.selectBy('id' , req.params.id ).then((dataContacts)=>{
    res.render('contacts_edit', {  dataContacts: dataContacts })
  })
})

router.post('/edit/:id', (req, res) => { //orm done
  Contacts.editID(req.params.id,req.body.name, req.body.company, req.body.telp_number, req.body.email).then( ()=>{
    res.redirect('../../contacts')
  })

})

router.get('/delete/:id', (req, res) => {
  Contacts.selectBy('id' , req.params.id ).then((dataContacts)=>{
    res.render('contacts_delete', {  dataContacts: dataContacts })
  })
})

router.post('/delete/:id', (req, res) => {
  Contacts.deleteID( req.params.id).then(()=>{
    res.redirect('../../contacts')
  })
})

module.exports = router;
