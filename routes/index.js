var express = require('express');
var router = express.Router();

/* GET home page. */
// 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
router.get('/admin', function(req, res, next) {
	
  res.render('admin', {page:req.query.page});

});



module.exports = router;
