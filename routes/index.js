var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/admin', function (req, res, next) {
  res.render('admin', { page: req.query.page });
});

module.exports = router;
