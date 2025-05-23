var express = require('express');
var router = express.Router();

const user = [

  {id:1, name: "Harshit", age: 26},
  {id:2, name: "DubDub", age: 25},
  {id:3, name: "Vikas", age: 30}

];
/* GET users listing. */
router.get('/', (req,res,next) => {

  res.json(user);
});

module.exports = router;
