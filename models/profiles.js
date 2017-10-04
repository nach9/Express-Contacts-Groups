var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


class Profiles {
  constructor (data){
    this.id = data.id
    this.username = data.username
    this.password = data.password
    this.contactID = data.contactID
  
  }

  static selectAll(){
    return new Promise(function(resolve, reject) {
      db.all('select * from profiles' , (err,rows)=>{
        let dataRows=[]
        rows.forEach(row=>{
          let profiles = new Profiles(row)
          dataRows.push(profiles)
        })
        resolve(dataRows)
      })
    });
  }

  static insertNew (username , password , contactID ){
    return new Promise(function(resolve, reject) {
      db.run(`insert into profiles values( null , '${username}' , '${password}' , '${contactID}'   )` , function(err) {
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
      db.all(`select * from profiles where ${column} = '${value}'`,(err,rows)=>{
        let dataProfiles = []
        rows.forEach((row)=>{
          let profile = new Profiles(row)
          // this.id = profile.id
          dataProfiles.push(profile)
        })
        resolve(dataProfiles)
      })
    });
  }

  static editID ( id,username,password ){
    return new Promise(function(resolve, reject) {
      db.run(`update profiles set username='${username}' , password = '${password}' where id = '${id}'`,err=>{
        resolve()
    });
  })
  }


  static deleteID (id){
    return new Promise(function(resolve, reject) {
      db.run(`delete from profiles where id = '${id}'`,err=>{
        resolve()
      })
    });
  }


}



module.exports = Profiles;
