const db = require('./connection');

let dbt = {
    getProducts: 'SELESCT * FROM products',
    getImages:'SELESCT * FROM images',
    getCategorias: 'SELESCT * FROM categoria',
    insertProduct:'INSERT INTO products(name, codigo, precio, descricion, sexo, tipo,  caregory_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
    insertImages:'INSERT INTO images(url, product_id, destacado) VALUES(?, ?, ?)',
    updateProduct:'UPDATE products SET name=? ,codigo=?, precio=?, descricion=?, sexo=?, tipo=?,  caregory_id=? WHERE id =?',
    updateImages:'UPDATE products SET url=? ,product_id=?, destacado=?  WHERE id =?',
    deleteProduct:'DELETE FROM produsts WHERE id=?',
    deleteImages:'DELETE FROM images WHERE id=?',
};

module.exports ={

    getProducts(){
        return new Promise ((resolve, reject) =>{
            db.all(dbt.getProducts, (err, rows) =>{
                if (err) reject(err);
                resolve(rows);
            })
        })
    },

    insertProduct(name, codigo, precio, descricion, sexo, tipo,  caregory_id){
        return new Promise ((resolve, reject) =>{
            db.run(dbt.insertProduct, [name, codigo, precio, descricion, sexo, tipo,  caregory_id], (err) =>{
                if(err) reject(err);
                resolve ();
            })
        })
    },


    getImages(){
        return new Promise ((resolve, reject) =>{
            db.all(dbt.getImages, (err, rows) =>{
                if (err) reject(err);
                resolve(rows);
            })
        })
    },

    insertImages(url, product_id, destacado){
        return new Promise ((resolve, reject) =>{
            db.run(dbt.insertProduct, [url, product_id, destacado], (err) =>{
                if(err) reject(err);
                resolve ();
            })
        })
    },

    
    getCategorias(){
        return new Promise ((resolve, reject) =>{
            db.all(dbt.getCategorias, (err, rows) =>{
                if (err) reject(err);
                resolve(rows);
            })
        })
    },

}