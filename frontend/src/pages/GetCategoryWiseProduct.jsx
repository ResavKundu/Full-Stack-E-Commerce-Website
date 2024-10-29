import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {setProductDetails} from "../store/userSlice"
import SummaryApi from '../../common';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseData';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import productCategory from "../helpers/productCatagory"
import VerticalCard from "../components/VerticalCard"
const GetCategoryWiseProduct = () => {
    const [getAllCategoryProduct,setGetAllCategoryProduct]=useState([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    // const params=useParams();
    // const dispatch=useDispatch();
    // console.log("Category",params)

    const [sortBy,setSortBy]=useState("")
    // const {fetchUserAddToCart}=useContext(Context)
    const [filterCategoryList,setFilterCategoryList] = useState([])
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    console.log("URL",location)
    const urlCategoryListinArray = urlSearch.getAll("category")
    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })
    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject);
   
    
    const fetchData=async()=>{
      setLoading(true)
      const response=await fetch(SummaryApi.filterProduct.url,{
        method:SummaryApi.filterProduct.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      })
      const responseData= await response.json()
      setGetAllCategoryProduct(responseData?.data || [])
      console.log("Response data",responseData)
      setLoading(false)
      
    }
    console.log("Filter ",filterCategoryList)
    useEffect(()=>{
      fetchData()
    },[filterCategoryList])


    const handleSelectCategory=(e)=>{
       const {name,value,checked}=e.target
      //  console.log("CATEGORY",value,checked)
       setSelectCategory((prev)=>{
        return{
          ...prev,
          [value]:checked
        }
       })
    }
    useEffect(()=>{
     const arrayOfCategory=Object.keys(selectCategory).map(prev=>{
      if(selectCategory[prev]){
        return prev
      }else null
     }).filter(el=>el)
     setFilterCategoryList(arrayOfCategory)
      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])
  



    {/**Sort By */}
    const handleSortBy=(e)=>{
       const {value}=e.target
       setSortBy(value);
       console.log("SORT By",value)
       if(value === "asc")setGetAllCategoryProduct((prev)=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
       if(value === "dsc")setGetAllCategoryProduct((prev)=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
      }
  useEffect(()=>{

  },[sortBy])
  return (
    <div className='conatiner mx-auto p-4'>
      {/**Dextop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        <div className='bg-white p-2 min-h-[calc(100vh-100px)]'>
           <div className='text-base font-bold text-slate-600 '>
              <div>SORT BY</div>
              <hr></hr>
              <form className="text-sm felx felx-col gap-2 py-2 m-2">
                 <div className=" felx  gap-2 ">
                   <input type='radio' name='sortBy' checked={sortBy==='asc'} value="asc" onChange={handleSortBy}/>
                   <label>Price - Low to High</label>
                 </div>
                 <div>
                   <input type='radio' name='sortBy' value="dsc" checked={sortBy==='dsc'} onChange={handleSortBy}/>
                   <label>Price -  High to Low</label>
                 </div>

              </form>
           </div>
           {/**Filter By */}
           <div>
           <hr></hr>
             <h3 className='text-base font-bold text-slate-500 m-2'>CATEGORY</h3>
             <hr></hr>
             <form className=" text-sm felx felx-col py-2">
              {
                  productCategory.map((prev,index)=>{
                    return(
                      <div className='flex items-center  gap-4 m-2'>
                         <input type='checkbox' id={prev?.value} value={prev?.value} checked={selectCategory[prev?.value]} onChange={handleSelectCategory}/>
                         <label htmlFor={prev?.value}>{prev?.label}</label>
                      </div>
                    )
                  })
              }
             </form>
           </div>
        </div>
        <div>
         {/***right side ( product ) */}
         <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {getAllCategoryProduct.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] '>
              {
                getAllCategoryProduct.length !== 0 && !loading && (
                    <VerticalCard data={getAllCategoryProduct} loading={loading}/>
                  )
              }
             </div>
            </div>
        
        </div>
      </div>
    </div>
  )
};

export default GetCategoryWiseProduct;