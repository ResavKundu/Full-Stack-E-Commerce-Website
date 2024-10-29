const orderModel = require("../../models/orderproductModel")

const orderController=async(req,res)=>{
    try {
        const currentUserId=req.userId;
        const orderList=await orderModel.find({userId:currentUserId});
        res.json({
            data:orderList,
            success:true,
            error:false,
            message:"Order List Successfully Get"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=orderController