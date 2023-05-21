const express=require("express")
require("dotenv").config();
const {signup,login}=require("../Controllers/userController")
const userModel = require("../Models/user.model")
const jwt=require("jsonwebtoken")


const app=express.Router()



app.post("/signup",signup)

app.post("/login",login)


module.exports=app
