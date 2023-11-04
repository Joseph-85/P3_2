var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const VJ = "db.sqlite"

let db = new sqlite3.Database(VJ, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, codigo INTERGER NOT NULL, precio REAL NOT NULL,  descripcion TEXT,  sexo TEXT, empresa TEXT, caregory_id INTEGER,  FOREIGN(category_id) REFERENCES categorias(id))'),
        db.run('CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, url text, product_id INTEGER, destacado text, FOREIGN KEY (products_id) REFERENCES products(id) ');

        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'

            }
        };  
    }
});


module.exports = db