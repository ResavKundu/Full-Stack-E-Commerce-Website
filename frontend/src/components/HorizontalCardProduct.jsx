import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseData';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import addToCart from "../helpers/addToCart"
import Context from '../context';
const HorizontalCardProduct = ({
    category,heading
}) => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const loadingList=new Array(13).fill(null);
    const [scroll,setScroll]=useState(0);
    const scrollElement=useRef()
    const {fetchUserAddToCart}=useContext(Context)
    const handleAddToCart=async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
    const fetchData=async()=>{
        setLoading(true);
        const categoryProduct=await fetchCategoryWiseProduct(category);
        setData(categoryProduct.data);
        setLoading(false);
        console.log(categoryProduct.data)
    }
    const handleLeft=()=>{
        scrollElement.current.scrollLeft-=300
    }
    const handleRight=()=>{
        scrollElement.current.scrollLeft+=300
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='container mx-auto p-4  m-5 relative bg-white shadow-lg border'>
        <h2 className='font-semibold text-2xl p-2'>{heading}</h2>
       {
        loading ?
        (
        <div className=' flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all ' ref={scrollElement}>
        
        <button onClick={handleLeft} className='bg-white shadow-md absolute left-0 text-lg rounded-full p-1 hidden md:block'><FaAngleLeft /></button>
        <button onClick={handleRight} className='bg-white shadow-md absolute right-0 rounded-full p-1 hidden md:block' ><FaAngleRight /></button>
    
    {
        loadingList.map((e,index)=>{
            return(
                
                <div className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px] h-36 bg-white rounded-md shadow-lg border flex'>
                    <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse'>
                        
                    </div>
                    <div>
                        <div className='  justify-center p-3'>  {/*/*text-ellipsis line-clamp-2* */}
                            <div className='text-ellipsis line-clamp-1 overflow-hidden  w-36'>
                                <div className=' h-5 w-36 pb-4 bg-slate-100 '></div> 
                            </div>
                            <p className='pb-3 my-2 capitalize h-4 bg-slate-100 animate-pulse'></p>
                            <div className='flex justify-center pb-2 gap-3'>
                                <h1 className='bg-slate-100 h-4 w-16 rounded-md text-xl font-semibold'></h1>
                                <h1 className='bg-slate-100 h-4 w-16 rounded-md text-slate-400'></h1>
                            </div>
                            {/* <div className='text-sm text-green-800 pb-2'>{Math.round(((e.price-e.sellingPrice)/e.price)*100)}% off</div> */}
                            <div className='h-8 w-28 bg-slate-100 rounded-full flex justify-center'>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        })
    }
    </div>
        )
        :
        (
        <div className=' flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all ' ref={scrollElement}>
        
        <button onClick={handleLeft} className='bg-white shadow-md absolute left-0 text-lg rounded-full p-1 hidden md:block'><FaAngleLeft /></button>
        <button onClick={handleRight} className='bg-white shadow-md absolute right-0 rounded-full p-1 hidden md:block' ><FaAngleRight /></button>
    
            {
                data.map((e,index)=>{
                    return(
                        <NavLink to= {`/displayroduct/${e._id}`}>
                        <div className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px] h-36 bg-white rounded-md shadow-lg border flex'>
                            <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                                <img src={e.productImage[0]} alt={"product"+index} className='object-scale-down h-full hover:scale-105'/>
                            </div>
                            <div>
                                <div className='  justify-center p-3'>  {/*/*text-ellipsis line-clamp-2* */}
                                    <div className='text-ellipsis line-clamp-1 overflow-hidden  w-14'>
                                        <h1 className='font-semibold'>{e.productName}</h1> 
                                    </div>
                                    <p className='pb-1 capitalize text-green-600'>{e.category}</p>
                                    <div className='flex justify-center pb-2 gap-3'>
                                        <h1 className='text-rose-500 text-xl font-semibold'>₹{e.sellingPrice}</h1>
                                        <h1 className='line-through text-slate-400'>₹{e.price}</h1>
                                    </div>
                                    {/* <div className='text-sm text-green-800 pb-2'>{Math.round(((e.price-e.sellingPrice)/e.price)*100)}% off</div> */}
                                    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-purple-600 hover:to-indigo-800 hover:drop-shadow-xl flex justify-center transition-all ease-in-out duration-300'>
                                        <button className='p-2 text-white text-sm' onClick={(prev) => handleAddToCart(prev, e?._id)}>
                                            Add To Cart
                                        </button>
                                    </div>



                                </div>
                            </div>
                        </div>
                        </NavLink>
                    )
                })
             }
    </div>
        )
       }
        
    </div>
  )
}

export default HorizontalCardProduct

// linear-gradient(90deg, #667eea 0%, #764ba2 100%)