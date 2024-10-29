const productModel=require("../../models/productmodel");
const permissionToUplaodProduct=require("../../helpers/permission");
async function updateProductController(req,res){
    try {
        const productId=req._id;
        // console.log("Response ".req);
        if(!permissionToUplaodProduct(req.userId)){
            throw new Error("Permission Denied");
        }
        const {_id,...resbody}=req.body;
        const updateProduct=await productModel.findByIdAndUpdate(_id,resbody)
        res.json({
            message : "Product update successfully",
            data : updateProduct,
            success : true,
            error : false
        })
    } catch (error) {
        res.status(400).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
module.exports=updateProductController