const productModel=require("../models/productmodel")
const uploadProductPermission=require(".././helpers/permission")
async function UploadProductController(req,res) {
    try {
        const seasonId=req.userId
        if(!uploadProductPermission(seasonId)) {
            throw new Error("Permission Denied!!");
        }
        const uploadProduct=new productModel(req.body);
        const saveProduct=await uploadProduct.save();
        res.status(201).json({
            data: saveProduct,
            error: false,
            success : true,
            message : "Product Upload Successfully",
        })
    } catch (error) {
        res.status(400).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
module.exports=UploadProductController