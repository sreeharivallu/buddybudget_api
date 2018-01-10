var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router()
var multer = require('multer');

const config = require('../config');
const adduser = require('../controllers/users/adduser');
const getuser = require('../controllers/users/getuser');
const updateuser = require('../controllers/users/updateuser');
const deleteuser = require('../controllers/users/deleteuser');
const loginuser = require('../controllers/users/loginuser');
const signup = require('../controllers/users/signup');


const addItem = require('../controllers/items/addItem');
const listItems = require('../controllers/items/listItems');
const addGroup = require('../controllers/items/addGroup');
const listGroup = require('../controllers/items/listGroup');
const deleteGroup = require('../controllers/items/deleteGroup');

const adddriver = require('../controllers/drivers/adddriver');
const getdriver = require('../controllers/drivers/getdriver');
const updatedriver = require('../controllers/drivers/updatedriver');
const deletedriver = require('../controllers/drivers/deletedriver');
const logindriver = require('../controllers/drivers/logindriver');

/*use this if you want to store file with same filename
  that you are getting. Ideally, it is not safe to store
  files
  */
 /*
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({storage:storage});
*/

var upload = multer({dest:'./uploads'});
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.status(200).json({message:'home page'})
})
// define the about route
router.get('/about', function (req, res) {
  res.status(200).json({message:'About route'})
})


router.post('/signup', signup.signup);
router.post('/login', loginuser.loginuser);
// route middleware to verify a token
router.use(function(req, res, next) {
  
  // check header or url parameters or post parameters for token
  var token;

  if(req.body.token || req.query.token || req.headers['x-access-token']){
    token = req.body.token || req.query.token || req.headers['x-access-token'];
  }else if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    token = req.headers.authorization.split(' ')[1];
  }
             
  
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secretToken, function(err, decoded) {      
      if (err) {
        console.log('decode err is', err);
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        //console.log('decoded is', decoded);
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).json({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});


//This accepts files as well
router.post('/adduser', adduser.adduser);
router.get('/getuser',getuser.getuser);
router.post('/updateuser',updateuser.updateuser);
router.post('/deleteuser',deleteuser.deleteuser);

router.post('/adddriver', adddriver.adddriver);
router.get('/getdriver',getdriver.getdriver);
router.post('/updatedriver',updatedriver.updatedriver);
router.post('/deletedriver',deletedriver.deletedriver);
router.post('/logindriver', logindriver.logindriver);

router.post('/addItem', addItem.addItem);
router.get('/listItems/:groupName/:id', listItems.listItems);
router.post('/addGroup', addGroup.addGroup);
router.get('/listGroup', listGroup.listGroup);
router.post('/deleteGroup',deleteGroup.deleteGroup);

router.post('/form',upload.any(),function(req, res, next){	
	res.send('form posted');
})

module.exports = router