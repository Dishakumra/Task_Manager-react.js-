var express = require('express');
var schema = require('../schema');
var router = express.Router();
  const moment = require('moment')
  const today = moment().startOf('day')
router.post('/gettodolist/:id',function(req,res){
  //console.log("kl");
  schema.todolists.find(
    {
      userid:req.params.id
    },(err,data)=>{
      if(err)
      {
      console.log(err);
      res.send(err);}
      else {
        console.log(data);
        res.send(data);
      }
    }
  )

});
router.post('/addtotodo/:id',function(req,res){
  console.log("kl");
  var d = new Date(req.body.LastDate);
  var s=new Date();
  var f=s.toISOString()
    var n = d.toISOString();
  new_todo=new schema.todolists({
    userid:req.params.id,
    TaskName:req.body.TaskName,
    CreateDate:moment(today).startOf('day').toDate(),
    LastDate:n,
    Priority:req.body.Priority,
    Status:'pending'
  })
  new_todo.save(function (err, todo) {
  if (err)
  return console.error(err);
  console.log("task added")

  res.send('added');
});


});

router.post('/removedata/:id',function(req,res){
  console.log("kl");



console.log(moment(today).startOf('day').toDate())
  schema.todolists.deleteMany(
    {
      //userid:req.params.id,
     LastDate:{ $lte: moment(today).startOf('day').toDate()}
    },(err,data)=>{
      if(err)
      res.send(err);
      console.log(data)
      res.send("update database")

    }
  )

});
router.post('/changeStatus/:id',function(req,res){
  schema.todolists.findOneAndUpdate(
    {
      _id:req.body.id
    },{
      Status:"Done"
    },{
      new:true
    },

      function(err,doc){
        if(err)
        res.send("something went wrong")
        res.send("updated")
      }
  )
})
module.exports=router;
