const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:[true,'Password is required!!']
    },
    profilepic: String,
    role:String,
},{ timestamps:true})

const  userModel=mongoose.model('user',userSchema)
module.exports=userModel;