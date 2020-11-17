const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormulareSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
