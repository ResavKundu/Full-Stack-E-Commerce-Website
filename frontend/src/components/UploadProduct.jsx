import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCatagory"
import { IoMdCloudUpload } from "react-icons/io";
import uploadImages from '../helpers/uploadImages';
import DisplayImage from './DisplayImage'
import { RiDeleteBin6Fill } from "react-icons/ri";
import SummaryApi from "../../common/index"
import {toast} from "react-toastify"
const UploadProduct = ({
    onClose,
    fetchDataa
}) => {
    const [data,setData]=useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        description:"",
        price:"",
        sellingPrice:""
    })
    const [openFullSceen,setOpenFullScreen]=useState(false);
    const [fullScreenImage,setFullScreenImage]=useState("");
    const handleOnChange=(e)=>{
         const {name,value}=e.target;

         setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
         })
    }
    const handleUploadProductImage=async(e)=>{
        const file=e.target.files[0];
        const uploadImageCloudnary=await uploadImages(file)
        setData((prev)=>{
            return{
                ...prev,
                productImage:[...prev.productImage,uploadImageCloudnary.url]
            }
        })
        
    }
    const handleDeleteProductIamge=async(e)=>{
        const newProductImage=[...data.productImage];
        newProductImage.splice(e,1);
        setData((prev)=>{
            return {
                ...prev,
                productImage:[...newProductImage]
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log("Data ",data);
        const fetchResponce=await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData=await fetchResponce.json();
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchDataa()
        }
        if(responseData.error){
            toast.error(responseData?.message)
        }
    }
    
  return (
    <div className='fixed w-full h-full top-0 bg-slate-200 bg-opacity-35 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden'>
           <div className='flex justify-between pb-3'>
              <h2 className='p-2 font-bold'>Upload Product</h2>
              <div className=' cursor-pointer' onClick={onClose}>
                <IoClose className='hover:bg-slate-300 rounded-full text-lg' />
              </div>
           </div>
           <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name :</label>
            <input type="text" 
                   id="productName" 
                   placeholder='Enter Product name..' 
                   name='productName'
                   value={data.productName} 
                   onChange={handleOnChange} 
                   className='bg-slate-100 p-2 border rounded outline-none'
            />
            <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
            <input type="text" 
                   id="brandName" 
                   placeholder='Enter Brand name..' 
                   name='brandName'
                   value={data.brandName} 
                   onChange={handleOnChange} 
                   className='bg-slate-100 p-2 border rounded outline-none'
            />
            <label htmlFor="category" className='mt-3'>Category :</label>
            <select value={data.category} name="category" onChange={handleOnChange} className='bg-slate-100 p-2 border rounded outline-none cursor-pointer'>
            <option value="" key="" >Select Category</option>
                  {
                    productCategory.map((e,index)=>{
                        return (
                            <option value={e.value} key={e.id+index}>{e.label}</option>
                        )
                    })
                  }
            </select>
            <label htmlFor="productImage" className='mt-3'>Image :</label>
                <label htmlFor="uploadProductImage">
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-white-500 flex justify-center items-center flex-col'>
                            <IoMdCloudUpload className='text-5xl'/>
                            <p className='text-sm '>Upload Product Image</p>
                            <input type='file' id='uploadProductImage' className='hidden' onChange={handleUploadProductImage}/>
                        </div>
                </div>
            </label>
            <div>
            {
                data?.productImage[0]?(
                  <div className="flex gap-2 items-center">
                    {data.productImage.map((e,index)=>{
                        return (
                            <div className=' relative flex justify-between bg-slate-100 group h-32 '>
                                <img src={e} alt={e} width={80} height={90} className='bg-slate-100 border cursor-pointer h-32 object-fit ' 
                                onClick={()=>
                                    {setOpenFullScreen(true)
                                    setFullScreenImage(e)}
                                }/>
                                <div className='absolute right-0 m-0 hidden group-hover:block bg-slate-300 rounded-full p-0.5 cursor-pointer' onClick={()=>handleDeleteProductIamge(index)}>
                                   <RiDeleteBin6Fill />
                                </div>
                            </div>
                        )
                    })}
                  </div>
                ):(
                    <p className="text-red-600 text-xs">*Please upload product image</p>
                )
            }
               
            </div>
            <label htmlFor="productPrice" className='mt-3'>Price :</label>
            <input type="number" 
                   id="productPrice" 
                   placeholder='Enter Price of the Product..' 
                   name='price'
                   value={data.price} 
                   onChange={handleOnChange} 
                   className='bg-slate-100 p-2 border rounded outline-none'
            />

            <label htmlFor="sellingPrice" className='mt-3'>Selling Price :</label>
            <input type="number" 
                   id="sellingPrice" 
                   placeholder='Enter Selling Price of the Product..' 
                   name='sellingPrice'
                   value={data.sellingPrice} 
                   onChange={handleOnChange} 
                   className='bg-slate-100 p-2 border rounded outline-none'
            />
            <label htmlFor="description" className='mt-3'>Description:</label>
            <textarea 
                     id="description" 
                     name='description' 
                     value={data.description}
                     onChange={handleOnChange} 
                     className='h-28 bg-slate-100 border outline-none p-2' 
                     placeholder='Enter product placeholder...'>

            </textarea>
            <button className="text-white bg-orange-500 rounded-md p-2 mb-8 hover:bg-orange-600">Upload Product</button>
           </form>
        </div>
        {/* Display Image Full Screen */}
        {
            openFullSceen &&
            (<DisplayImage onClose={()=>setOpenFullScreen(false)} imgUrl={fullScreenImage}/>)}
    </div>
  )
}

export default UploadProduct