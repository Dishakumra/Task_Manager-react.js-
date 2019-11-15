var express = require('express');
var router = express.Router();
var schema = require('../schema')

 var mongoose = require('mongoose');
 mongoose.set('useFindAndModify', false);
 // var todo = mongoose.model('lists')




/////////////////////////////////////////////////////////////////////////////////////////
router.post('/login', function(req, res) {
 console.log("coming here")
  // console.log(req.body.Email)
console.log(schema.todo)
            schema.todo.find({"Email":req.body.Email},(err,data)=>{
              console.log("in fn")
            if(data.length!=0)
            {
              console.log(data[0].pass)
              if(data[0].pass == req.body.Password)
              {
                console.log(data[0]._id)
                let o=JSON.stringify(data[0]._id);
                res.send(`${o}`)
              }
              else
                {
                  console.log("pass didnt matched")
                }

            }
            else
            {
              console.log("user not exists")
            }
            res.send();
          //  console.log("not")


})
});





////////////////////////////////////////////////////////////////////////////////////////////////
  router.post('/signup', function(req, res, next) {
    console.log(req.body.Email)
    schema.todo.find({"Email":req.body.Email},(err,data)=>{
    if(data.length!=0)
    {


      res.sendStatus(400)

    }
    else
    {
      user_new = new schema.todo({
        Email:req.body.Email,
        pass:req.body.Password,
        Name:"",
        Age:"",
        Gender:""
      })
    user_new.save(function (err, todo) {
    if (err)
    return console.error(err);
    console.log("User added")
    console.log(todo.id);

      var d=JSON.stringify(todo.id);
    res.send(`${d}`);
  });
    }
})
})

router.post('/filldetails/:id',function(req,res)
{
    console.log(req.params.id+"kk");
  schema.todo.findOneAndUpdate({

    _id:req.params.id
  },
  {
Name: req.body.Name,
Age: req.body.Age,
Gender:req.body.Gender
// field:values to update
},{
  new:true
},

  function(err,doc){
    if(err)
    res.send("something went wrong")
    res.send("updated")
  })


})



///////////////////////////////////////////////////////////////////////////////????////

module.exports = router;
