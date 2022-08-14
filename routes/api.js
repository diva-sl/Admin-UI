var express = require('express');
var router = express.Router();
const url = require('url');
const users = require('../userData');
const user=require('../admin'); 

/* GET users listing. */
router.get('/loadPage',(req, res) => {
    res.writeHead(200,{
      'Content-Type':'application/json'
  })
    

    res.end(JSON.stringify(users.loadPages()));	
});



router.get('/pageSetup',(req,res) => {

    res.writeHead(200,{
      'Content-Type':'application/json'
  })
    
    res.end(JSON.stringify(users.pageSetup()));	

});


router.get('/searchInUsers',(req, res) => {

    res.writeHead(200,{
        'Content-Type':'application/json'
    });


    res.end(JSON.stringify(users.searchInUsers(req.query.search))); 
});


router.get('/changePage',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });

    
    res.end(JSON.stringify(users.changePage(req.query.page)));

})

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


router.get('/selectAll',(req,res) => {
   
    res.writeHead(200,{
        'Content-Type':'application/json'
    });

    res.end(JSON.stringify(users.selectAll(req.query.select)));

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

  // <a href="#">&laquo;</a>
  // <a href="#">1</a>
  // <a href="#" class="active">2</a>
  // <a href="#">3</a>
  // <a href="#">4</a>
  // <a href="#">5</a>
  // <a href="#">6</a>
  // <a href="#">&raquo;</a>