const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./db/DB.sqlite', () => {


  db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, codigo INTERGER NOT NULL, precio REAL NOT NULL, descripcion TEXT, sexo TEXT, tipos TEXT, caregory_id INTEGER, FOREIGN(category_id) REFERENCES categorias(id))');
  db.run('CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, url text, product_id INTEGER, destacado text, FOREIGN KEY (products_id) REFERENCES products(id) ');

});

module.exports = db;