const bcrypt=require("bcryptjs");
const userModel=require("../models/userModel");
const jwt = require('jsonwebtoken');
async function userSignInController(req,res) {
    try {
        const {email,password}=req.body
        if(!email){
            throw new Error("Pease Enter provided Email !!")
        }
        if(!password){
            throw new Error("Pease Enter provided Password !!")
        }
        const userExit=await userModel.findOne({email});
        if(!userExit){
            throw new Error("User not found")
        }
       const checkPassword=await bcrypt.compare(password,userExit.password );
       console.log(checkPassword);
       if(checkPassword){
        const tokenData={
            _id: userExit._id,
            email: userExit.email,
        }
      const token=jwt.sign(tokenData, process.env.TOKEN_SECKET_KEY, { expiresIn: 60 * 60*8 });
      const tokenOption={
        httpOnly:true,
        secure:true
     }
     res.cookie("token",token,tokenOption)
     .status(200)
     .json({
       message:"Login Successfully",
       data:token,
       success:true,
       error:false,
     })   
    }else{
         throw new Error("Please Check Password")
       }
      
    } catch (error) {
        res.json({
            message:error.message||error,
            error:true,
            success:false,
        })
    }
}

module.exports=userSignInController