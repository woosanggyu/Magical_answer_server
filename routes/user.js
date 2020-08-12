var express = require('express');
var router = express.Router();
var resCode = require('../resCode/code');

const jwt = require('jsonwebtoken');
const models = require('../models');
const verify = require('../config/verify');
const secretObj = require('../config/jwt');

router.post('/signup', function(req, res, next) {
    let body = req.body;

    models.user.create({
        ID : body.id,
        Password : body.password,
        Nickname : body.nickname,
        Gender : body.gender,
        Age : body.age,
        CreateTime : new Date()
    })
    .then( signup =>{
        console.log(signup);
        res.json({
            msg : "회원가입 되었습니다."
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            msg: "회원가입에 실패했습니다."
        })
    })
})

router.post('/signin', function(req, res, next){
    let body = req.body;

    models.user.findOne({where : {
            ID : body.id,
            Password : body.password
        }})
        .then( loginuser => {
            console.log(loginuser);

            var Token = "";
            var nickname = "";

            if(loginuser !== null) {
                Token = jwt.sign({
                    id : loginuser.dataValues.ID
                }, secretObj.secret, {
                    expiresIn : '15m'
                })
                nickname = loginuser.dataValues.Nickname
                userid = loginuser.dataValues.ID
            }


            console.log(nickname);
            console.log(Token);
            
            res.json({
                message : "로그인에 성공했습니다.",
                ID: userid,
                Nickname : nickname,
                token : Token
            })
        })
        .catch(err => {
            console.log(err);
            res.json({
                message : resCode.FailedMessage,
                ID: "",
                Nickname : "",
                token : ""
            })
        })
})

router.post('/checkid', function(req, res, next) {
    let body = req.body;

    models.user.findOne({
        where : {
            ID : body.id
        }
    })
    .then(check => {
        var answer = ""
        if(check) {
            answer = "사용중인 아이디 입니다."
        } else {
            answer = "사용가능한 아이디 입니다."
        }

        res.json({
            msg : answer
        })
    })
    .catch(err =>{
        console.log(err);
        res.json({
            msg : "통신 오류"
        })
    })
})

router.post('/checknick', function(req, res, next) {
    let body = req.body;

    models.user.findOne({
        where : {
            Nickname : body.nickname
        }
    })
    .then(check => {
        var answer = ""
        if(check) {
            answer = "사용중인 닉네임 입니다."
        } else {
            answer = "사용가능한 닉네임 입니다."
        }

        res.json({
            msg : answer
        })
    })
    .catch(err =>{
        console.log(err);
        res.json({
            msg : "통신 오류"
        })
    })
})

module.exports = router;