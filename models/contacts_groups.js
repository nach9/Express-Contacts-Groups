var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


class Contacts_Groups {
  constructor (data){
    this.id = data.id
    this.contactsID = data.contactsID
    this.groupsID = data.groupsID
  }

  static selectAll(){
    return new Promise(function(resolve, reject) {
      db.all('select * from Contacts_Groups' , (err,rows)=>{
        let dataRows=[]
        rows.forEach(row=>{
          let contacts_Groups = new Contacts_Groups(row)
          dataRows.push(contacts_Groups)
        })
        resolve(dataRows)
      })
    });
  }

  static insertNew (contactID , groupsID  ){
    return new Promise(function(resolve, reject) {
      db.run(`insert into Contacts_Groups values( null , '${contactID}' , '${groupsID}'   )` , function(err) {
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
      db.all(`select * from Contacts_Groups where ${column} = '${value}'`,(err,rows)=>{
        let dataRows = []
        rows.forEach((row)=>{
          let contacts_Groups = new Contacts_Groups(row)
          // this.id = profile.id
          dataProfiles.push(contacts_Groups)
        })
        resolve(dataRows)
      })
    });
  }

  static editID ( id,contactsID , groupsID){
    return new Promise(function(resolve, reject) {
      db.run(`update Contacts_Groups set contactsID='${contactsID}' , groupsID = '${groupsID}' where id = '${id}'`,err=>{
        resolve()
    });
  })
  }


  static deleteID (id){
    return new Promise(function(resolve, reject) {
      db.run(`delete from Contacts_Groups where id = '${id}'`,err=>{
        resolve()
      })
    });
  }


}



module.exports = Contacts_Groups;
