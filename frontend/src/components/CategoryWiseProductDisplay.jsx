import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseData';
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
const CategoryWiseProductDisplay = ({
    category,heading
}) => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const loadingList=new Array(13).fill(null);
    const [scroll,setScroll]=useState(0);
    const scrollElement=useRef()
    const fetchData=async()=>{
        setLoading(true);
        const categoryProduct=await fetchCategoryWiseProduct(category);
        
        setLoading(false);
        setData(categoryProduct.data);
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
    },[category])
  return (
    <div className='container mx-auto py-6 relative'>
        <h2 className='mt-4 font-semibold text-2xl py-4'>{heading}</h2>
        <div className=' flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
        
            <button onClick={handleLeft} className='bg-white shadow-md absolute left-0 text-lg rounded-full p-1 hidden md:block'><FaAngleLeft /></button>
            <button onClick={handleRight} className='bg-white shadow-md absolute right-0 rounded-full p-1 hidden md:block'><FaAngleRight /></button>
        
        {
            data.map((e,index)=>{
                return(
                    <NavLink to= {`/displayroduct/${e._id}`}>
                    <div className='w-full min-w-[300px] md:min-w-[320px] max-w-[300px] md:max-w-[320px]  bg-white rounded-md shadow-lg '>
                        <div className=' flex justify-center bg-slate-100  p-2 min-w-[120px] md:min-w-[145px] h-48'>
                            <img src={e.productImage[0]} alt={"product"+index} className='object-scale-down h-full hover:scale-105 mix-blend-multiply'/>
                        </div>
                        <div>
                            <div className='  justify-center p-3'>  {/*/*text-ellipsis line-clamp-2* */}
                                <div className='text-ellipsis line-clamp-2 overflow-hidden '>
                                    <h1 className='font-semibold'>{e.productName}</h1> 
                                </div>
                                <p className='pb-1 capitalize text-green-600'>{e.category}</p>
                                <div className='flex justify-between p-2 gap-3'>
                                    <h1 className='text-rose-500 text-xl font-semibold'>₹{e.sellingPrice}</h1>
                                    <h1 className='line-through text-slate-400'>₹{e.price}</h1>
                                </div>
                                {/* <div className='text-sm text-green-800 pb-2'>{Math.round(((e.price-e.sellingPrice)/e.price)*100)}% off</div> */}
                                <div className='bg-lime-600 rounded-full hover:bg-lime-700 hover:drop-shadow-2xl flex justify-center'>
                                    <button className=' p-2 text-white text-sm'>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </NavLink>
                )
            })
        }
        </div>
        
    </div>
  )
}

export default CategoryWiseProductDisplay