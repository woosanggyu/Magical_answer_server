var express = require('express');
var router = express.Router();
const models = require('../models');

router.post('/nobase', function(req, res, next) {
  
  let no = req.body.no
  console.log(no);

  models.nobase.findOne({
    where : {
      no : no
    }
  })
  .then(result => {
    console.log(result);
    res.json({
      'msg' : result.todo
    });
  })
  .catch(err => {
    console.log(err);
  })
});


module.exports = router;
