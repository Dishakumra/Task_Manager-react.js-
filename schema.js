var mongoose = require('mongoose');
var mongodb = require('mongodb')
var mongoDB = 'mongodb://localhost/Todos';
var MongoClient = mongoDB.MongoClient;



var todo=new mongoose.Schema({
  Email:String,
  pass:String,
  Name:String,
  Age:String,
  Gender:String
})
var imgs=new mongoose.Schema({
  userid:String,
  imageName: {
     type: String,
     default: "none",
     required: true
 },
 imageData: {
     type: String,
     required: true
 }
})
var todolists=new mongoose.Schema({
  userid:String,
  TaskName:String,
  CreateDate:Date,
  LastDate:Date,
  Status:String,
  Priority:String


})
var todo=mongoose.model('lists',todo);
var imgs=mongoose.model('imgs',imgs);
var todolists=mongoose.model('todolists',todolists)
module.exports={
  todo:todo,
  imgs:imgs,
  todolists:todolists
}
