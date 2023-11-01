var express = require('express');
var router = express.Router();
const request = require('request');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/usua.ejs', function (_req, res, _next) {
  res.render('usua.ejs');
});


router.post('/usua.ejs', function (_rep, res, _next) {

  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.username && pass == process.env.claves) {
    router.get('/Emp', (_req, res) => {
      res.render('Emp');
    });
    
  } else {
    res.render('ingres', { error: 'datos incorrectos' });
  }
})


router.get('/Emp.ejs', function (_req, res, _next) {
  res.render('Emp.ejs');
});

module.exports = router;
