//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const port = Process.env.PORT || 3000 
const mongoose = require('mongoose');
require('./models/db');
var Task = mongoose.model('Task');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
  await Task.find((err,docs)=>{
    if(!err){
      res.render("home",{posts:docs})
    }
    else{
      console.log('Error in retrieving task list :' + err);
    }
  }).clone().catch(function(err){ console.log(err)})

})
// app.get("/about",(req,res)=>{
//   res.render("about",{aboutc:aboutContent,})
// })
// app.get("/contact",(req,res)=>{
//   res.render("contact",{contactc:contactContent})
// })
app.get("/compose",(req,res)=>{
  var post={
    title:"",
    content:""
  }
  res.render("compose",{post:post})
})
app.post("/compose",(req,res)=>{
  
  insertRecord(req,res)
  res.redirect("/")
})

function insertRecord(req,res){
  var task = new Task();
  task.title=req.body.postTitle,
  task.content=req.body.postBody
  
  task.save()
  .then(data =>{
    console.log("Post added");
  })
  .catch(err=>{
    console.log(err);
  })
}


app.get('/posts/:id', async(req,res)=>{
  
  try {
    await Task.findById(req.params.id, (err,doc)=>{
      if(!err){
        // console.log("doc: "+doc);
        res.render("post",{post:doc})
      }
      else{
        console.log(err);
      }
    }).clone();
  } catch (e){
    console.log("Error in Port " + e);
  }
  
  })
  
app.get('/:id', async (req,res)=>{
    await Task.findById(req.params.id, (err,doc)=>{
      if(!err){
        // console.log("doc: "+doc);
        res.render("compose",{post:doc})
      }
      else{
        console.log(err);
      }
    })
})


app.get('/delete/:id', async(req,res)=>{
  await Task.findByIdAndRemove(req.params.id, (err,doc)=>{
    if(!err){
      res.redirect('/');
    }
    else{
      console.log("error while deleting"+err);
    }
  }).clone().catch(function(err){ console.log(err)})
})


app.listen(port,()=>{  // do not add localhost here if you are deploying it
  console.log("server listening to port "+port);
});