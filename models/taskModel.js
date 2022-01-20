const mongoose = require('mongoose')

var taskschema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    
}); 

mongoose.model('Task',taskschema);  // (name of schema, schema Object)
// Employee -> should be in singular. In database it stores as 'employees' -> plural