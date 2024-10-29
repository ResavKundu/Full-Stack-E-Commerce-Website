const productModel=require("../models/productmodel")
async function searchFunctionality(req,res) {
    try {
        const query=req.query.q
        const regex=new RegExp(query,"i","g")
        const searchProduct=await productModel.find({
            "$or":[
                {
                    productName:regex
                },{
                    category:regex
                }
            ]
        })
        console.log("searchProduct,",searchProduct)
        res.status(200).json({
            data:searchProduct,
            message:"Search Successful",
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message:error || error.message,
            success:false,
            error:true
        })
    }
}
module.exports=searchFunctionality