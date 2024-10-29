import React, { useEffect, useState } from 'react'
import SummaryApi from "../../common/index"
import {Link, NavLink, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setProductDetails} from "../store/userSlice"
import BannerProduct from './BannerProduct'
import HorizontalCardProduct from './HorizontalCardProduct'
import VerticalCardProduct from './VerticalCardProduct'
import Footer from './Footer'

const HomePage= ()=> {
  const[categoryWiseProduct,setCategoryWiseProduct]=useState([])
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch();
  const navigate = useNavigate()
  const categoryLoading = new Array(13).fill(null)
  // const fetchAllProduct=async ()=>{
  //     const response=await fetch(SummaryApi.getAllProduct.url,{
  //       method:SummaryApi.getAllProduct.method,
  //       credentials:"include"
  //     })
  //     const responseData=await response.json();
  //     setAllProductData(responseData.data);
  //     dispatch(setProductDetails(responseData.data))
  //     // console.log("Response Home Page",responseData.data);
  // }
 const productPag=(product)=>{
   navigate(`/product-category?category=${product.category}`)
 }
  const fetchCategoryWiseProduct=async()=>{
    setLoading(true)
    const response=await fetch(SummaryApi.getAllCategoryProduct.url,{
       method:SummaryApi.getAllCategoryProduct.method,
       credentials:"include"
    })
    const responseData=await response.json();
    setCategoryWiseProduct(responseData.data);
    setLoading(false)
  }
  useEffect(()=>{
    // fetchAllProduct()
    fetchCategoryWiseProduct()
  },[])
  return (
    <>
      <div className='container mx-auto p-4 bg-white m-4 shadow-md'>
         <div className='flex items-center justify-between overflow-scroll scrollbar-none'>
               {
                loading? (
                  categoryLoading.map((product,index)=>{
                    return(
                      <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden animate-pulse bg-slate-200 border '>
                         
                      </div>
                  )})
                ):(

                  categoryWiseProduct.map((product,index)=>{
                  return(
                    
                   <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category} >
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-3 overflow-hidden shadow-md cursor-pointer ' >
                      <img src={product.productImage[0]} alt={product?.productName} className='h-full mx-auto object-scale-down hover:scale-150 transition-all' key={`productCategory${index}`}/>
                  </div>
                  <p className='text-center text-sm md:text-base capitalize font-semibold text-blue-800 '>{product?.category}</p>
                  </Link>
                                        
                    )
                  })
                )
                
               }
         </div>
      </div>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Best Mobile"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Trending Gadgets & Appliances"}/>
      <VerticalCardProduct category={"speakers"} heading={"Best of Electronics"}/>
      <Footer/>
    </>
  )
};

export default HomePage
{/* <NavLink to={`/productcategory?category=${product.category}`}>
<div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-3 overflow-hidden shadow-md cursor-pointer ' >
    <img src={product.productImage[0]} alt={product.productName} className='h-full mx-auto object-scale-down hover:scale-150 transition-all' key={`productCategory${index}`}/>
</div>
<p className='text-center text-sm md:text-base capitalize'>{product.category}</p>
</NavLink> */}