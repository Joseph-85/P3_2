const sqlite3 = require ('sqlite3').verbose();
const path = require ('path');

const db_name = path.join(__dirname, '../db/DB.db');
const db = new sqlite3.Database(db_name, err =>{
    if (err) { 
        console.error(err.message);
    }else {
        console.log('conexion a la Base de Datos Exitosa!!!');
    }
});

db.serialize(() =>{
const sql_create="CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT);";
db.run(sql_create, err =>{
  if (err) {
    console.error (err.message);
  } else {
    console.log("Anexada de la tabla categorias exitosa!!!");
  }
})
const sql_create2="CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, precio REAL NOT NULL, codigo INTERGER NOT NULL, descripcion TEXT, sexo TEXT, empresa TEXT, caregory_id INTEGER, FOREIGN(category_id) REFERENCES categorias(id));";
db.run(sql_create2, err =>{

  if (err) {
    console.error (err.message);
  } else {
    console.log("Anexada de la tabla productos exitosa!!!");
  }
})
const sql_create3="CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, url text, product_id INTEGER, destacado text, FOREIGN KEY (products_id) REFERENCES products(id);";
db.run(sql_create3, err =>{
  if (err) {
    console.error (err.message);
  } else {
    console.log("Anexada de la tabla imagenes exitosa!!!");
  }
});
})

module.exports = db;

