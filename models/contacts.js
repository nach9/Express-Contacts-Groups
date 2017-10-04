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

  static insertNew (name , company , telp_number , email ){
    return new Promise(function(resolve, reject) {
      db.run(`insert into contacts values( null , '${name}' , '${company}' , '${telp_number}' , '${email}'  )` , function(result) {
        resolve( this.lastID)
      })
    });
  }

  static selectAll(){
    return new Promise(function(resolve, reject) {
      db.all('SELECT * FROM Contacts', (err,rows)=> {
        let dataContacts = []
        rows.forEach((row)=>{
          let contact = new Contacts(row)
          dataContacts.push(contact)
        })
        resolve(dataContacts)
      })
    });
  }


  static selectBy ( column , value ){
    return new Promise(function(resolve, reject) {
      db.all(`select * from contacts where ${column} = '${value}'`,(err,rows)=>{
        let dataContacts = []
        rows.forEach((row)=>{
          let contact = new Contacts(row)
          dataContacts.push(contact)
        })
        resolve(dataContacts)
      })
    });
  }

  static editID ( id,name , company ,telp_number, email ){
    return new Promise(function(resolve, reject) {
      db.run(`update contacts set name='${name}' , company = '${company}' , telp_number='${telp_number}', email = '${email}' where id = '${id}'`,err=>{
        resolve()
      })
    });

  }

  static deleteID (id){
    return new Promise(function(resolve, reject) {
      db.run(`delete from contacts where id = '${id}'`,err=>{
        resolve()
      })
    })
  }



}



module.exports = Contacts;
