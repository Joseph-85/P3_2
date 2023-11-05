require('dotenv').config
var express = require('express');
var app = express();
var router = express.Router();
const request = require('request');
var md5 = require ('md5');
const sqlite3 = require('sqlite3');


const VJ = require ('../db/models')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/usua.ejs', function (req, res, next) {
  res.render('usua.ejs');
});

router.get('/nc.ejs', function (req, res, next) {
  res.render('nc.ejs');
});
router.get('/ni.ejs', function (req, res, next) {
  res.render('ni.ejs');
});
router.get('/np.ejs', function (req, res, next) {
  res.render('np.ejs');
});
router.get('/npn.ejs', function (req, res, next) {
  res.render('npn.ejs');
});
router.get('/nin.ejs', function (req, res, next) {
  res.render('nin.ejs');
});
router.get('/ncn.ejs', function (req, res, next) {
  res.render('ncn.ejs');
});


router.get('/Emp', function (req, res, next) {
  res.render('Emp');
});


router.post('/usua', function (req, res, next) {

  let user = req.body.user
  let pass = req.body.pass
  
  if (user == process.env.username && pass == process.env.claves) {
   
    res.redirect('Emp');
    }
     else {
    res.render('usua', { error: 'datos incorrectos' });
  }
});


router.get('/products', function(req, res, next){
  VJ
  .obtenerprd()
  .then(products =>{
    res.render('products', {products:products});
  })
  .catch(err =>{
    return res.status(500).send("Error buscando producto");
  })
});


router.get('/categorias', function(req, res, next){
  VJ
  .obtenerctg()
  .then(categorias =>{
    res.render('categorias', {categorias: categorias});
  })
  .catch(err =>{
    return res.status(500).send("Error buscando categorias");
  })
});


router.get('/images', function(req, res, next){
  VJ
  .obtenerimg()
  .then(images =>{
    res.render('images', {images: images});
  })
  .catch(err =>{
    return res.status(500).send("Error buscando imagenes");
  })
});



//Get productos page agg
router.get('/prdagg', function(req, res, next){
  VJ
  .obtenerctg()
  .then(categorias=>{
    res.render('aggprd', {categorias: categorias});
  })
  .catch(err =>{
    return res.status(500).send("Error a cargar la pagina");
  })
})

//Get categorias page agg
router.get('/ctgagg', function(req, res, next){
  res.render('aggctg');
})

//Get imagenes page agg
router.get('/imgagg', function(req, res, next){
  VJ
  .obtenerprd()
  .then(productos=>{
    res.render('aggimg', {productos: productos});
  })
  .catch(err =>{
    return res.status(500).send("Error a cargar la pagina");
  })
})



//
router.post('/nc', function(req, res, next){
  const {nombre} = req.body;
  console.log(nombre);
  VJ
  .insertarctg(nombre)
  .then(idCategoriaInsertado =>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.error(err.message);
    return res.status(500).send("Error insertando producto");
  });
})

//
router.post('/np', function(req, res, next){
  const {nombre, precio, codigo, descripcion, sexo, empresa, caregory_id} = req.body;
  VJ
  .insertarprd(nombre, precio, codigo, descripcion, sexo, empresa, caregory_id)
  .then(idproductsInsertado =>{
    res.redirect('/products');
  })
  .catch(err =>{
    console.error(err.message);
    return res.status(500).send("Error insertando producto");
  })
});

//
router.post('/ni', function(req, res, next){
  const {url, destacado, product_id} = req.body;
  VJ.insertarimg(url, destacado, product_id)
  .then(idimagesInsertada=>{
    res.redirect('/images');
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error insertando imagen');
  })
});



//Get productos page edit
router.get('/prdedit/:id', function(req,res,next){
  const id=req.params.id;
  VJ
  .obtenerprdPorId(id)
  .then(products=>{
    res.render('editprd', {products: products});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando el producto')
  })
});

//Get categorias page edit
router.get('/ctgedit/:id', function(req,res,next){
  const id=req.params.id;
  VJ
  .obtenerctgPorId(id)
  .then(categorias=>{
    res.render('editctg', {categorias: categorias});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando la categoria')
  })
});

//Get imagenes page edit
router.get('/imgedit/:id', function(req,res,next){
  const id=req.params.id;
  VJ
  .obtenerimgPorId(id)
  .then(images=>{
    res.render('editimg', {images: images});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando la imagen')
  })
});





//Update productos page
router.post('/updateprd/:id', function(req, res, nexte){
  const id= req.params.id;
  const {nombre, precio, codigo, descripcion, sexo, empresa} = req.body;
  VJ
  .actualizarprd(nombre, precio, codigo, descripcion, sexo, empresa, id)
  .then(()=>{
    res.redirect('/products');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando el producto');
  })
});

//Update categorias page
router.post ('/updatectg/:id', function(req, res, next){
  const id = req.params.id;
  const {nombre} = req.body;
  VJ
  .actualizarctg(nombre, id)
  .then(()=>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando la categoria');
  })
});

//Update imagenes page
router.post('/updateimg/:id', function(req, res, next){
  const id = req.params.id;
  const {url, destacado} = req.body;
  VJ
  .actualzarimg(url, destacado, id)
  .then(()=>{
    res.redirect('/images');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando la imagen');
  })
});




module.exports = router;
