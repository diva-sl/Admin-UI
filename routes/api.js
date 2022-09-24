var express = require('express');
var router = express.Router();
const url = require('url');
const users = require('../userData');

/* GET users listing. */
router.get('/users',(req, res) => {
  const {pageno = 1, size = 10} = req.query;
  res.writeHead(200,{
    'Content-Type':'application/json'
  });
  res.end(JSON.stringify(users.getPage(pageno, size)));
});


router.get('/pagination',(req,res) => {

    res.writeHead(200,{
      'Content-Type':'application/json'
  })
    
    res.end(JSON.stringify(users.paginatioSetup())); 

});


router.get('/searchInUsers',(req, res) => {

    res.writeHead(200,{
        'Content-Type':'application/json'
    });


    res.end(JSON.stringify(users.searchInUsers(req.query.search))); 
});



router.get('/navigatePage',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });


    res.end(JSON.stringify(users.navigatePage(req.query.page)));

})

router.get('/selectUser',(req,res) => {

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    
    res.end(JSON.stringify(users.selectUser(req.query.select)));

})


router.get('/selectAllUsers',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });

    res.end(JSON.stringify(users.selectAll()));

})


router.get('/editUser',(req,res) => {

  res.writeHead(200,{

    'Content-Type' : 'application/json'
});
  

  res.end(JSON.stringify(users.editUser(req.query.user)));

})

router.post('/saveUser',(req,res) => {

  if (users.checkData(req.body)){
      res.writeHead(200,{

        'Content-Type' : 'application/json'
    });
      users.saveUser(req.body)
      res.end(JSON.stringify('ok'));
  }else {
    res.end(JSON.stringify('invalid enteries...'));
}

})



router.get('/deleteUser',(req,res) => {

  res.writeHead(200,{

    'Content-Type' : 'application/json'
});
  
  users.deleteUser(req.query.user);
  
  res.end(JSON.stringify('User Record was deletetd'));

})
router.get('/deleteAll',(req,res) => {


  res.writeHead(200,{

    'Content-Type' : 'application/json'

})

  res.end(JSON.stringify(users.deleteAll()));
  
})


module.exports = router;