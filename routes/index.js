require('dotenv').config
var express = require('express');
var app = express();
var router = express.Router();
const request = require('request');
var md5 = require ('md5');
const sqlite3 = require('sqlite3');






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

router.get('/products' , function (req, res, next){
  db.select(function(rows){
    res.render('DB', {rows: rows});
  });
});


router.get('/categorias' , function (req, res, next){
  db.select(function(rows){
    res.render('DB', {rows: rows});
  });
});

router.get('/images' , function (req, res, next){
  db.select(function(rows){
    res.render('DB', {rows: rows});
  });
});


router.get('/', (req, res) => {
  db.getProducts()
  .then(data =>{
    console.log(data)
    res.render('index', {prosucts: data});
  })
  .catch(err =>{
    res.render('index' , {products:[]});
  })
});


app.get("/products", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});









module.exports = router;
