var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');


function createTable() {
  let sqlq = "CREATE TABLE  IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT  , name STRING , company STRING , telp_number STRING , email STRING )"
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    }
  });

  sqlq = "CREATE TABLE  IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT   , name_of_group STRING )"
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    }
  });

  sqlq = "CREATE TABLE  IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT   , username STRING  , password STRING)"
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    }
  });

  sqlq = "CREATE TABLE  IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT   ,street STRING  , city STRING , zipcode INTEGER)"
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    }
  });

  db.close()
}

function  alterTableProfiles(){
  let sqlq = `alter table Profiles ADD column contactID integer REFERENCES Contact(id)`
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    } else{
      console.log('add column ok');
    }
  });

   sqlq = `create unique index FK_contactID on Profiles(contactID)`
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    } else{
      console.log('add unique ok');
    }
  });

}


function  alterTableAddress(){
  let sqlq = `alter table Addresses ADD column contactID integer REFERENCES Contacts(id)`
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    } else{
      console.log('add column ok');
    }
  });

}

function conjunctionContactsGroups(){
  let sqlq = `create table IF NOT EXISTS Contacts_Groups (id integer primary key autoincrement , contactsID integer REFERENCES Contacts(id) , groupsID integer REFERENCES Groups(id)) `
  db.run(sqlq, (err) => {
    if (err) {
      console.log(err);
    } else{
      console.log('add column ok');
    }
  });
}


// alterTableProfiles()
// alterTableAddress()
conjunctionContactsGroups()
