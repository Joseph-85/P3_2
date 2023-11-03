require('dotenv').config
var express = require('express');
var app = express();
var router = express.Router();
const request = require('request');
var sqlite3 = require ('sqlite3').verbose();
var md5 = require ('md5');
const db = require ('../db/models');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/usua.ejs', function (req, res, next) {
  res.render('usua.ejs');
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


router.get('/Emp', function (req, res, next) {
  res.render('Emp');
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

module.exports = router;
