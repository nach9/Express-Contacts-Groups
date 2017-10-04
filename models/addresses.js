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
  }


    static selectAll(){
      return new Promise(function(resolve, reject) {
        db.all('select * from addresses' , (err,rows)=>{
          let dataRows=[]
          rows.forEach(row=>{
            let addresses = new Addresses(row)
            dataRows.push(addresses)
          })
          resolve(dataRows)
        })
      });
    }

    static insertNew (street,city,zipcode,contactID ){
      return new Promise(function(resolve, reject) {
        db.run(`insert into addresses values( null , '${street}' , '${city}' , '${zipcode}' , '${contactID}'  )` , function(err) {
          if(err){
            reject(err)
          }else{
            resolve(this.lastID)
          }
        })
      });
    }

    static selectBy ( column , value ){
      return new Promise(function(resolve, reject) {
        db.all(`select * from addresses where ${column} = '${value}'`,(err,rows)=>{
          let dataAddress = []
          rows.forEach((row)=>{
            let addresses = new Addresses(row)
            dataAddress.push(addresses)
          })
          resolve(dataAddress)
        })
      });
    }

    static editID ( id,street,city,zipcode,contactID ){
      return new Promise(function(resolve, reject) {
        db.run(`update addresses set street='${street}' , city = '${city}'  , zipcode = '${zipcode}' where id = '${id}'`,err=>{
          resolve()
      });
    })
    }


    static deleteID (id){
      return new Promise(function(resolve, reject) {
        db.run(`delete from addresses where id = '${id}'`,err=>{
          resolve()
        })
      });
    }


  }

module.exports = Addresses;
