var express = require('express');
var router = express.Router();
const request = require('request')
const convert = require('xml-js');
const models = require('../models');
var dotenv = require('dotenv');
// const { json } = require('sequelize/types');

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

        var num = body.response.body.items.item.length;
        console.log(num);

        var arr = new Array;

        for(i=0; i < num ;i++){
          arr.push(body.response.body.items.item[i].title)
        }

        res.json({
          answer : arr[getRandomInt(0, num-1)]
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

      var num = body.response.body.items.item.length;

      var title = new Array;
      var addr = new Array;

      for(i=0; i < num ;i++){
        title.push(body.response.body.items.item[i].title)
        addr.push(body.response.body.items.item[i].addr1)
      }

      var number = getRandomInt(0, num-1)

      res.json({
        title : title[number],
        address : addr[number] 
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
})
module.exports = router;
