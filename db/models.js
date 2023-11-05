const db = require ('../db/connection');

module.exports = {
    obtener() {
        return new Promise ((resolve, reject) =>{
            const sql = `SELECT products.*, categorias.nombre, images.url, images.destacado
            FROM products
            INNER JOIN categorias
            ON products.caregory_id = categorias.id
            INNER JOIN images
            ON products.id = images.product_id`;
            db.all (sql, (err, resultados) =>{
                if (err) reject (err);
                else resolve (resultados);
            });
        });
    },
    obtenerctg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'Select * FROM categorias';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerctgPorId(id){
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT * FROM categorias where id = ?'
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarctg(nombre){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
            db.run(sql, [nombre], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualizarctg(nombre, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE categorias SET nombre = ? WHERE id = ?'
            db.run(sql, [nombre, id], (err) =>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarctg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM categorias WHERE id = ?'
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    obtenerprd(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * from products';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerprdPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM products WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarprd(nombre, precio, codigo, descripcion, sexo, empresa, caregory_id){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO products (nombre, precio, codigo, descripcion, sexo, empresa, caregory_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run (sql, [nombre, precio, codigo, descripcion,sexo, empresa, caregory_id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualizarprd(nombre, precio, codigo, descripcion, sexo, empresa, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE  products SET nombre = ?, precio = ?, codigo = ?, descripcion = ?, sexo = ?, empresa = ? WHERE id = ?';
            db.run(sql, [nombre, precio, codigo, descripcion, sexo, empresa, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarprd(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM  products WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });        
    },
    obtenerimg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * FROM images';
            db.all(sql, (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerimgPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM images WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarimg(url, destacado, product_id){
        return new Promise ((resolve, reject)=>{
            const sql = 'INSERT INTO images (url, destacado, product_id) VALUES (?, ?, ?)';
            db.run (sql, [url, destacado, product_id], (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualzarimg(url, destacado, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE images SET url = ?, destacado = ? WHERE id = ?';
            db.run (sql, [url, destacado, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarimg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM images WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject (err);
                else resolve();
            });
        });
    },
};