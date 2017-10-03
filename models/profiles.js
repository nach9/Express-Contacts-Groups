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
    this.name = data.name
  }

  static selectAll(cb){
    db.all('SELECT a.*,b.name FROM profiles a join contacts b on a.contactID = b.id ', (err,rows)=>{
      let dataRows=[]
      rows.forEach(row=>{
        let profiles = new Profiles(row)
        dataRows.push(profiles)
        console.log(dataRows);
      })
      db.all('select * from Contacts' , (err,rows)=>{
        cb(dataRows , rows)
        // res.render('profiles' , { dataRows:dataRows , dataContacts : rows , errorMsg : errorMsg } )
      })
    })
  }

  static insertNew (username , password , contactID ,cb){
    db.run(`insert into profiles values( null , '${username}' , '${password}' , '${contactID}'   )` , (err)=> {
      cb(err, this.lastID)
    })
  }

  static selectBy ( column , value , cb){
    db.all(`select * from profiles where ${column} = '${value}'`,(err,rows)=>{
      let dataProfiles = []
      rows.forEach((row)=>{
        let profile = new Profiles(row)
        this.id = profile.id
        dataProfiles.push(profile)
      })
      cb(dataProfiles)
    })
  }

  static editID ( username,password, cb ){
    db.run(`update profiles set username='${username}' , password = '${password}' where id = '${this.id}'`,err=>{
      cb()
    })
  }

  static deleteID (cb){
    db.run(`delete from profiles where id = '${this.id}'`,err=>{
      cb()
    })
  }


}



module.exports = Profiles;
