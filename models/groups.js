var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Groups {
  constructor(data) {
    this.id = data.id
    this.name_of_group = data.name_of_group

  }

    static selectAll(){
      return new Promise(function(resolve, reject) {
        db.all('select * from groups' , (err,rows)=>{
          let dataRows=[]
          rows.forEach(row=>{
            let profiles = new Groups(row)
            dataRows.push(profiles)
          })
          resolve(dataRows)
        })
      });
    }

    static insertNew (name_of_group ){
      return new Promise(function(resolve, reject) {
        db.run(`insert into groups values( null , '${name_of_group}' )` , function(err) {
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
        db.all(`select * from groups where ${column} = '${value}'`,(err,rows)=>{
          let dataProfiles = []
          rows.forEach((row)=>{
            let profile = new Groups(row)
            dataProfiles.push(profile)
          })
          resolve(dataProfiles)
        })
      });
    }

    static editID ( id,name_of_group ){
      return new Promise(function(resolve, reject) {
        db.run(`update groups set name_of_group='${name_of_group}'  where id = '${id}'`,err=>{
          resolve()
      });
    })
    }


    static deleteID (id){
      return new Promise(function(resolve, reject) {
        db.run(`delete from groups where id = '${id}'`,err=>{
          resolve()
        })
      });
    }

  }

module.exports = Groups;
