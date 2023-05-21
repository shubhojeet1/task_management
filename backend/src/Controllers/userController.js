const userModel=require("../Models/user.model")
const jwt=require("jsonwebtoken")
require("dotenv").config();


const signup = async(req,res) => {
    const {email,password,name}=req.body
    try{
        const user=await userModel.findOne({email})
        if (user) {
            res.status(404).send("You are a register user")
        } else {
            await userModel.create({email,password,name})
            return res.status(200).send("User Created")
        }
    }catch(e){
        console.log(e)
        return res.status(404).send(e.message)
    }
}



const login = async(req,res) => {
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        if (user){
            if (user.password==password) {
                let token=jwt.sign({email,name:user.name,id:user._id},process.env.PRIVATEKEY)
                res.status(200).send({message:"Login Successful",token,name:user.name})
            } else {
                res.status(404).send("Wrong password")
            }
        } else {
            res.status(404).send("You are not a register user")
        }
    }catch(e){
        return res.status(404).send(e.message)
    }
}



module.exports={signup,login}