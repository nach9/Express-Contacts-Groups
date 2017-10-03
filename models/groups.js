var express = require('express')
var router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Groups {
  constructor(data) {
    this.id = data.id
    this.name_of_group = data.name_of_group

  }

  static selectAll(cb) {
    db.all('SELECT * FROM groups', (err, rows) => {
      let dataRows = []
      rows.forEach(row => {
        let groups = new Groups(row)
        dataRows.push(groups)
      })
      cb(dataRows)
    })
  }

  static insertNew(name_of_group, cb) {
    db.run(`insert into Groups values( null , '${name_of_group}')`, (err) => {
      cb(err, this.lastID)
    })
  }


  static selectBy(column, value, cb) {
    db.all(`select * from groups where ${column} = '${value}'`, (err, rows) => {
      let dataGroups = []
      rows.forEach((row) => {
        let groups = new Groups(row)
        this.id = groups.id
        console.log(dataGroups);
        dataGroups.push(groups)
      })
      console.log(dataGroups);
      cb(dataGroups)
    })
  }

  static editID(name_of_group, cb) {
    db.run(`update groups set name_of_group='${name_of_group}'  where id = '${this.id}'`, err => {
      cb()
    })
  }

  static deleteID(cb) {
    db.run(`delete from groups where id = '${this.id}'`, err => {
      cb()
    })
  }

}

module.exports = Groups;
