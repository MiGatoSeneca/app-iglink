var conf = require('../config/app.js');
var express = require('express');
var router = express.Router();
var pug = require('pug');
var request = require("request")

router.get('/',function(req,res){
  const lang = require('../lang/es_ES.js');
  var data = conf.pug;
  data.lang = lang;
  var html = pug.renderFile('./views/empty/index.pug',data);
  res.send(html);
});

router.get('/:brand',function(req,res){
  var data = {
    url: "https://www.instagram.com/"+req.params.brand+"/?__a=1",
    json: true
  };
  request(data,function(error, response, data){
    const lang = require('../lang/es_ES.js');
    var count = 1;
    var posts_count = 0;
    var last_id = null;
    if (!error && response.statusCode === 200) {
      var iguser = {};
      iguser.avatar=data.user.profile_pic_url;
      iguser.avatarhd=data.user.profile_pic_url_hd;
      var data = conf.pug;
      data.lang = lang;
      data.brand = req.params.brand;
      data.avatar = iguser.avatar;
      data.avatarhd = iguser.avatarhd;
      data.timestamp = Math.floor(Date.now() / 1000);
      var html = pug.renderFile('./views/index.pug',data);
      res.send(html);
    }else{
      var data = conf.pug;
      data.lang = lang;
      data.brand = req.params.brand;
      var html = pug.renderFile('./views/error/index.pug',data);
      res.send(html);
    }
  });
});


module.exports = router;
