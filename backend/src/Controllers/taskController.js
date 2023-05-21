const taskModel = require("../Models/task.model");
require("dotenv").config();

const createTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  try {
    taskModel.create({ title, description, due_date });
    res.status(200).send("Task Created");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getAllTasks = async (req, res) => {
  const { page } = req.query;
  console.log(page);
  try {
    const tasks = await taskModel
      .find({})
      .limit(10)
      .skip((page - 1) * 10);
    const count = await taskModel.find({});
    res.status(200).send({ tasks, count: count.length });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.query;
  const { status } = req.body;
  console.log(id, status);
  try {
    await taskModel.findOneAndUpdate({ _id: id }, { completed: status });
    res.status(200).send("Task Updated");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    await taskModel.findOneAndDelete({ _id: id });
    res.status(200).send("Task Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { createTask, getAllTasks, updateTask, deleteTask };
