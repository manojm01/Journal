const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manoj:manoj@cluster0.59pa3.mongodb.net/taskDB', {useNewUrlParser:true} , (err)=>{

    if(!err){console.log('MongoDB Connection Succeeded');}
    else {console.log('Error in DB Connection: '+ err);}

});

require('./taskModel');