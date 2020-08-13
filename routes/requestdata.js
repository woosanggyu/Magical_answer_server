var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
const request = require('request');
const models = require('../models');
const rescodeObj = require('../resCode/code');
const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const verify = require('../config/verify');

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max-min))+min;
}

router.post('/eatdata', function(req, res, next) {
    let body = req.body;
    console.log("바디 :", body);

    models.areacode.findOne({
      where: {
        areafather : body.areafather,
        areaname : body.areaname
      }
    })
    .then(result => {
      // console.log(result);

      let dataurl = {
        url: 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey='+process.env.SERVICE_KEY,
        method:'GET',
        qs: {
          pageNo : 1,
          numOfRows : 10,
          MobileApp : "MagicalAnswer",
          MobileOS : "AND",
          arrange : "A",
          cat1 : null,
          contentTypeId : 39,
          areaCode : result.areacode,
          sigunguCode : result.sigunguCode,
          cat2 : null,
          cat3 : null,
          listYN : "Y",
          modifiedtime : null,
        },
        json:true
      }
      
      request(dataurl, function(err, respon, body) {

        var item = body.response.body.items.item;

        var title = new Array;
        var addr = new Array;

        if(item) {
          var number = getRandomInt(0, item.length-1)
  
          title.push(body.response.body.items.item[number].title)
          addr.push(body.response.body.items.item[number].addr1)
        } else {
          title.push("없엉");
          addr.push("진짜 없엉");
        }

        res.json({
          title : title[0],
          address : addr[0] 
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/doitdata', function(req, res, next) {
  let body = req.body;
  console.log("바디 :", body);

  models.areacode.findOne({
    where: {
      areafather : body.areafather,
      areaname : body.areaname
    }
  })
  .then(result => {
    // console.log(result);

    let dataurl = {
      url: 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey='+process.env.SERVICE_KEY,
      method:'GET',
      qs: {
        pageNo : 1,
        numOfRows : 100,
        MobileApp : "MagicalAnswer",
        MobileOS : "AND",
        arrange : "A",
        cat1 : "A02",
        contentTypeId : 12,
        areaCode : result.areacode,
        sigunguCode : result.sigunguCode,
        cat2 : "A0202",
        cat3 : null,
        listYN : "Y",
        modifiedtime : null,
      },
      json:true
    }
    
    request(dataurl, function(err, respon, body) {

      var item = body.response.body.items.item;

      var title = new Array;
      var addr = new Array;

      if(item) {
        var number = getRandomInt(0, item.length-1)

        title.push(body.response.body.items.item[number].title)
        addr.push(body.response.body.items.item[number].addr1)
      } else {
        title.push("없엉");
        addr.push("진짜 없엉");
      }
  
      res.json({
        title : title[0],
        address : addr[0] 
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/enjoydata', function(req, res, next) {
  let body = req.body;
  console.log("바디 :", body);

  models.areacode.findOne({
    where: {
      areafather : body.areafather,
      areaname : body.areaname
    }
  })
  .then(result => {
    // console.log(result);

    let dataurl = {
      url: 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey='+process.env.SERVICE_KEY,
      method:'GET',
      qs: {
        pageNo : 1,
        numOfRows : 100,
        MobileApp : "MagicalAnswer",
        MobileOS : "AND",
        arrange : "A",
        cat1 : "A02",
        contentTypeId : 12,
        areaCode : result.areacode,
        sigunguCode : result.sigunguCode,
        cat2 : "A0203",
        cat3 : null,
        listYN : "Y",
        modifiedtime : null,
      },
      json:true
    }
    
    request(dataurl, function(err, respon, body) {

      var item = body.response.body.items.item;
      
      var title = new Array;
      var addr = new Array;

      if(item) {
        var number = getRandomInt(0, item.length-1)

        title.push(body.response.body.items.item[number].title)
        addr.push(body.response.body.items.item[number].addr1)
      } else {
        title.push("없엉");
        addr.push("진짜 없엉");
      }
      
      res.json({
        title : title[0],
        address : addr[0] 
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/mymemo', function(req, res, next) {
  let logincheck = req.headers.token;
  let body = req.body;

  if (logincheck) {
    if( verify(logincheck, secretObj.secret)) {
      
      models.memo.findAll({
        where : {
          Writer : body.nickname 
        }
      })
      .then(memo => {
        res.json({ answer : memo })
      })
      .catch(err => {
        console.log(err);
        res.json({ answer : rescodeObj.ReadError })
      })
    } else {
      console.log("토큰이 만료되었습니다.")
      res.json({ answer : "다시 로그인해 주세요."})
    }
  } else {
    console.log("토큰이 없습니다.")
    res.json({ answer : "다시 로그인 해주세요."})
  }
})

router.post('/addmemo', function(req, res, next) {
  let logincheck = req.headers.token;
  let body = req.body;

  if (logincheck) {
    if( verify(logincheck, secretObj.secret)) {
      models.memo.create({
        writer : body.nickname,
        title : body.title,
        content : body.content,
        CreateTime : new Date()
      })
      .then( result => {
        res.json({ answer : rescodeObj.SuccessMessage })
      })
      .catch(err => {
        console.log(err);
        res.json({ answer : rescodeObj.CreateError})
      })
    } else {
      console.log("토큰이 만료되었습니다.")
      res.json({ answer : "다시 로그인해 주세요."})
    }
  } else {
    console.log("토큰이 없습니다.")
    res.json({ answer : "다시 로그인 해주세요."})
  }
})

router.put('/updatememo', function(req, res, next) {
  let logincheck = req.headers.token;
  let body = req.body;

  if (logincheck) {
    if( verify(logincheck, secretObj.secret)) {
      models.memo.update({
        title : body.title,
        content : body.content,
        CreateTime : new Date()
      },
      {
        where : { writer : body.nickname, no : body.no }
      })
      .then( update => {
        res.json({ answer: rescodeObj.SuccessMessage })
      })
      .catch( err => {
        console.log(err);
        res.json({ answer : rescodeObj.CreateError });
      })
    } else{
      console.log("토큰이 만료 되었습니다");
      res.json({
        answer : "다시 로그인 해주세요."
      });
    }
  } else {
    console.log("토큰이 없습니다.")
    res.json({ answer : "다시 로그인 해주세요."})
  }
})

router.delete('/delmemo', function(req, res, next) {
  let logincheck = req.headers.token;
  let body = req.body;

  if (logincheck) {
    if( verify(logincheck, secretObj.secret)) {
      models.memo.destroy({
        where : { writer : body.nickname, no : body.no }
      })
      .then( del => {
        res.json({ answer: rescodeObj.SuccessMessage })
      })
      .catch( err => {
        console.log(err);
        res.json({ answer : rescodeObj.DeleteError });
      });
    } else{
      console.log("토큰이 만료 되었습니다");
      res.json({
          answer : "다시 로그인 해주세요."
      });
    }
  } else {
    console.log("토큰이 없습니다.")
    res.json({ answer : "다시 로그인 해주세요."})
  }
})

module.exports = router;
