var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


class Contacts {
  constructor (data){
    this.id = data.id
    this.name = data.name
    this.company = data.company
    this.telp_number = data.telp_number
    this.email = data.email
  }

  static insertNew (name , company , telp_number , email ,cb){
    db.run(`insert into contacts values( null , '${name}' , '${company}' , '${telp_number}' , '${email}'  )` , function(result) {
      cb(result, this.lastID)
    })
  }

  static selectAll(cb){
    db.all('SELECT * FROM Contacts', (err,rows)=> {
      // let dataContacts = rows
      let dataContacts = []
      rows.forEach((row)=>{
        let contact = new Contacts(row)
        dataContacts.push(contact)
      })

      db.all('select * from groups' , (err,rows)=>{
      let dataGroups = rows
        cb(dataContacts , dataGroups )
      })
    })
  }

  static selectBy ( column , value , cb){
    db.all(`select * from contacts where ${column} = '${value}'`,(err,rows)=>{
      let dataContacts = []
      rows.forEach((row)=>{
        let contact = new Contacts(row)
        this.id = contact.id
        dataContacts.push(contact)
      })
      cb(dataContacts)
    })
  }

  static editID ( name , company ,telp_number, email, cb ){
    db.run(`update contacts set name='${name}' , company = '${company}' , telp_number='${telp_number}', email = '${email}' where id = '${this.id}'`,err=>{
      cb()
    })
  }

  static deleteID (cb){
    db.run(`delete from contacts where id = '${this.id}'`,err=>{
      cb()
    })
  }


}



module.exports = Contacts;
