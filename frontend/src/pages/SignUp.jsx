import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import imageTobase64 from "../helpers/imageTobase64"
import SummaryApi from '../../common/index';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const [data,setData]=useState({
    email:"",
    password:"",
    name:"",
    confirmpassword:"",
    profilepic:"",
  })
  const navigate=useNavigate();
  const handleOnChange=(e)=>{
    const {name,value}=e.target;

    setData((prevdata)=>{
      return {
        ...prevdata,
        [name]: value
      }
    })
  }
  const handleSubmit=async(e)=>{
     e.preventDefault()
     if(data.password==data.confirmpassword){
      const dataRes=await fetch(SummaryApi.SignUP.url,{
        method:SummaryApi.SignUP.method,
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(data)
       })
       const dataApi=await dataRes.json();
       console.log(dataApi);
       if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login");
       }
       if(dataApi.error){
        toast.error(dataApi.message)
       }
      //  toast(dataApi.message);
     }else{
       console.log("Please check password both password are not same")
     }
     
  }
  const handleUploadPic=async(e)=>{
    const file=e.target.files[0];
    const imagePic=await imageTobase64(file);
    // console.log("filee",imagePic);
    setData((prevdata)=>{
      return {
        ...prevdata,
        profilepic:imagePic
      }
    })
  }
  console.log(data);
  return (
    
    <section id='login'>
        <div className='max-auto container p-4'>
          <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
               <div>
                  <img src={data.profilepic || 'https://w7.pngwing.com/pngs/505/761/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png'} alt='login image'/>

               </div>
               <from>
                 <label>
                    <div className='text-xs bg-slate-300 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                      Upload photo
                    </div>
                    <input type='file' className='hidden' onChange={handleUploadPic}/>
                 </label>
               </from>
            </div>
            <from className='pt-8 flex flex-col gap-2' onClick={handleSubmit}>
            <div className='grid mt-5'>
              <label >Name:</label>
              <div className='bg-slate-100 p-2 border border-transparent hover:border-sky-200'>
                 <input 
                        type='name' 
                        placeholder='Enter name..' 
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        className='w-full h-full outline-none  bg-transparent'/>
              </div>
            </div>
            <div className='grid'>
              <label >Email:</label>
              <div className='bg-slate-100 p-2 border border-transparent hover:border-sky-200'>
                 <input 
                        type='email' 
                        placeholder='Enter Email..' 
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        required
                        className='w-full h-full outline-none  bg-transparent'/>
              </div>
            </div>
            <div className='grid'>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex border border-transparent hover:border-sky-200'>
                <input 
                        type={showPassword?"text":"password"} 
                        placeholder='Enter Password..' 
                        name='password'
                        value={data.password}
                        onChange={handleOnChange}
                        required
                        className='w-full h-full outline-none  bg-transparent'/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((preval)=>!preval)}>
                  <span>
                     { showPassword? <FaEyeSlash/>: <FaEye />}
              
                  </span>
                </div>
              </div>
              <div>
                <NavLink to="/forgotpassword" className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password</NavLink>
              </div>
            </div>
            <div className='grid'>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex border border-transparent hover:border-sky-200'>
                <input 
                        type={showConfirmPassword?"text":"password"} 
                        placeholder='Enter Confirm Password..' 
                        name='confirmpassword'
                        value={data.confirmpassword}
                        onChange={handleOnChange}
                        required
                        className='w-full h-full outline-none  bg-transparent'/>
                <div className='cursor-pointer' onClick={()=>setShowConfirmPassword((preval)=>!preval)}>
                  <span>
                     { showConfirmPassword? <FaEyeSlash/>: <FaEye />}
              
                  </span>
                </div>
              </div>
              <div>
                <NavLink to="/forgotpassword" className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password</NavLink>
              </div>
            </div>
            <button className='bg-[#89216b] text-yellow-100 px-2 py-2 w-full max-w-[150px] rounded-full  hover:bg-[#cf34a3] border-2 border-transparent border-fuchsia-600 mx-auto block mt-4 transition-all ease-in-out duration-300 font-medium text-base' >Sign Up</button>
          </from>
          <p className='mt-1'>Already have a account ?<NavLink to="/login" className="hover:underline hover:text-red-600 ">Login</NavLink></p>
          </div>
        </div>
      </section>
  )
}

export default SignUp