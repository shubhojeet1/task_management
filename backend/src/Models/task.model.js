const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    // required:true
  },
  description: {
    type: String,
    // required:true,
  },
  due_date: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskModel = model("task", taskSchema);

module.exports = taskModel;
