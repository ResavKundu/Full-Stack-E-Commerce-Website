const userModel=require('../models/userModel')
async function updateUser(req,res) {
    try {
        const sessionUser=req.userId
        const {userId,email,name,role}=req.body
        const payload={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }
        const user=await userModel.findById(sessionUser)
        console.log("Seassion User",user.role);
        const updateUser=await userModel.findByIdAndUpdate(userId,payload)
        res.json({
            data: updateUser,
            error: false,
            success : true,
            message : "User Updated",
        })
        // console.log("user",user);
    } catch (error) {
        res.status(400).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
    
}
module.exports=updateUser