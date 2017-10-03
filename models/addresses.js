var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Addresses {
  constructor (data){
    this.id = data.id
    this.street = data.street
    this.city = data.city
    this.zipcode = data.zipcode
    this.contactID = data.contactID
    this.contactName = data.contactName
  }

  static selectAll(cb){
    db.all('SELECT a.*,b.name as contactName FROM addresses a left join contacts b on a.contactID = b.id', (err,rows)=>{
      let dataRows=[]
      rows.forEach(row=>{
        let addresses = new Addresses(row)
        dataRows.push(addresses)
        console.log(dataRows);
      })
      db.all('select * from Contacts' , (err,rows)=>{
        cb(dataRows , rows)
      })
    })
  }

  static insertNew (street , city , zipcode, contactID ,cb){
    db.run(`insert into addresses values( null , '${street}' , '${city}' , '${zipcode}' , '${contactID}')` , (err)=> {
      cb(err, this.lastID)
    })
  }

  static selectBy ( column , value , cb){
    db.all(`select * from addresses where ${column} = '${value}'`,(err,rows)=>{
      let dataAddress = []
      rows.forEach((row)=>{
        let address = new Addresses(row)
        this.id = address.id
        dataAddress.push(address)
      })
      cb(dataAddress)
    })
  }

  static editID ( street , city , zipcode, cb ){
    db.run(`update addresses set street='${street}' , city = '${city}' , zipcode = '${zipcode}' where id = '${this.id}'`,err=>{
      cb()
    })
  }

  static deleteID (cb){
    db.run(`delete from addresses where id = '${this.id}'`,err=>{
      cb()
    })
  }

}

module.exports = Addresses;
