var express = require('express');
var indexModel = require('../models/indexModel')
var router = express.Router();

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportTwitter = require('../auth/twitter');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

// router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

// router.get('/auth/linkedin/callback',
//   passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/auth/github/callback',
//   passportGithub.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

router.get('/auth/twitter', passportTwitter.authenticate('twitter'),function(req,res) {
  indexModel.twitterToken(req.query).then((result)=>{
});
});

router.get('/sign-in-with-twitter?', function(req,res) {
  indexModel.twitterToken(req.query).then((result)=>{
    res.redirect('/sign')
    console.log(result.oauth_toekn)
    console.log(result.oauth_token_secrest)
});
});


  router.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      res.json(req.user);
    });


  router.get('/sign', function(req,res,next){
    indexModel.twitterToken(req.query).then((result)=>{
      res.redirect('/sign');
    }).catch((err)=>{
      console.log(err);
    })
  })



module.exports = router;
