const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const notSchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  context : {
    type : String,
    required : true,
  },
  startDate : {
    type : String,
    required : true,
  },
  finishDate : {
    type : String,
    required : true,
  },
  category : {
    type : String,
    required : true,
  },
  priority : {
    type : String,
    required : true,
  },
});

module.exports=mongoose.model('Not', notSchema);