const cartModel=require("../models/cartProduct")
const countAddToCartProduct=async(req,res)=>{
  try {
     const userId=req.userId
     const count=await cartModel.countDocuments({
        userId:userId
     })
     res.json({
        data:{
            count:count
        },
        message:"ok",
        error:false,
        success:true
     })
  } catch (error) {
    res.status(400).json({
        message:error || error.message,
        success:false,
        error:true
    })
  }
}
module.exports=countAddToCartProduct