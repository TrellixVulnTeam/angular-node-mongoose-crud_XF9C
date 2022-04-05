const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RelativeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth_date: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
  },
  blood_group: {
    type: String,
    required: true,
  },


 
  contact_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("employee", RelativeSchema);
