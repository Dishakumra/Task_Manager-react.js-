
var express = require('express');
var router = express.Router();
var passport=require('passport');
//
router.post("/auth/google",
passport.authenticate("google",{
  scope:["profile","email"]
}) ,(req,res)=>{
 res.send("dd");

});
router.post("/auth/google/callback",
passport.authenticate("google",{
  successRedirect:'/login',
  failureRedirect:'/'
}),
(req,res)=>{
console.log("ff");
//
// res.render('/login');
// res.send("ffff");
}
);

module.exports=router;
