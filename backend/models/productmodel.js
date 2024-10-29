const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
        productName:{
            type:String,
            trim:true,
            unique:true,
        },
        brandName:{
            type:String,
            
        },
        category:{
            type:String,
           
        },
        productImage:[],
        description:String,
        price:Number,
        sellingPrice:Number
},{timestamps:true})

const productModel=mongoose.model("product",productSchema)
module.exports=productModel;
