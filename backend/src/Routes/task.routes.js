const express=require("express")
require("dotenv").config();
const {createTask, getAllTasks, updateTask, deleteTask}=require("../Controllers/taskController")
const taskModel = require("../Models/task.model")


const app=express.Router()


app.post("/", createTask)

app.get("/", getAllTasks)

app.put("/", updateTask)

app.delete("/", deleteTask)



module.exports=app
