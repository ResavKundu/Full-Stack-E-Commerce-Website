const userModel= require("../models/userModel");
const bcrypt=require("bcryptjs");
async function userSignUpController(req,res){
    try {
        const {email,password,name}=req.body;
        const userExit=await userModel.findOne({email})
        if(userExit){
            throw new Error("User Already Exits")
        }
        if(!email){
            throw new Error("Pease Enter provided Email !!")
        }
        if(!password){
            throw new Error("Pease Enter provided Password !!")
        }
        if(!name){
            throw new Error("Pease Enter provided Name !!")
        }
        const salt=bcrypt.genSaltSync(10);
        const hashPassword=await bcrypt.hashSync(password,salt);
        if(!hashPassword){
            throw new Error("Something went wrong");
        }
        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }

        const userData=new userModel(payload)
        const saveUser=await userData.save()
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created Successfully"
        })
    } catch (error) {
        res.json({
            message:error.message||error,
            error:true,
            success:false,
        })
    }
}

module.exports=userSignUpController