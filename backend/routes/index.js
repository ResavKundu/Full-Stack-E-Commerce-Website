const express=require('express')
const router=express.Router()
const userSignUpController=require("../controller/userSignUp");
const userSignInController=require("../controller/userSignin")
const userDetailsController=require("../controller/userDetails")
const authToken=require("../middleware/authToken");
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const UploadProductController = require('../controller/uploadProduct');
const getAllProduct = require('../controller/getProduct');
const updateProductController=require("../controller/Product/updateProductController");
const getCategoryProductOne = require('../controller/Product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/Product/getCategoryWiseProduct');
const findOneProductId = require('../controller/Product/findOneProductId');
const searchFunctionality = require('../controller/searchFunctionality');
const addToCart = require('../controller/addToCart');
const countAddToCartProduct = require('../controller/countAddToCartProduct');
const addToCartProductView = require('../controller/addToCartProductView');
const updateAddToCartProduct = require('../controller/updateAddToCartProduct');
const removeProductFromAddToCart = require('../controller/removeProductFromAddToCart');
const filterProductControlle = require('../controller/filterProduct');
const paymentController = require('../controller/order/payment.order');
const webhook = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');

router.post("/signup",userSignUpController);
router.post("/login",userSignInController);
router.get("/user-details",authToken,userDetailsController);
router.get("/userLogout",userLogout)

//admin panel
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser)

//upload product
router.post("/upload-product",authToken,UploadProductController)
router.get("/all-product",getAllProduct)
router.post("/update-product",authToken,updateProductController)
router.get("/get-allcategoryproduct",getCategoryProductOne)
router.post("/get-categoryWiseProduct",getCategoryWiseProduct)
router.post("/findproductid",findOneProductId)
router.get("/search",searchFunctionality)
router.post("/filter-product",filterProductControlle)

//router add to cart
router.post("/addtocart",authToken,addToCart)
router.get("/countaddtocartproduct",authToken,countAddToCartProduct)
router.get("/addtocartproductview",authToken,addToCartProductView)
router.post("/updateaddtocartproduct",authToken,updateAddToCartProduct)
router.post("/removeProductFromAddToCart",authToken,removeProductFromAddToCart)

//payment and order
router.post("/checkout",authToken,paymentController)
router.post("/webhook",webhook)  // /api/webhook
router.get("/order-list",authToken,orderController)
module.exports=router