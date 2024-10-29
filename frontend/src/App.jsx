import { useEffect, useState } from 'react'
import React from 'react';
import {BrowserRouter, Routes,Route, Outlet, Router} from "react-router-dom";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import AdminPanel from "./pages/AdminPanel"
import AllUsers from './pages/AllUsers';
import DisplayFullProduct from './pages/DisplayFullProduct';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../common/index';
import Context from './context';
import {setUserDetails} from "./store/userSlice"
import { useDispatch } from 'react-redux';
import AllProduct from './pages/AllProduct';
import Cart from "./pages/Cart"
import Home from './pages/Home';
import GetCategoryWiseProduct from './pages/GetCategoryWiseProduct';
import './App.css'
import SearchingResultPage from './pages/SearchingResultPage';
import Success from './pages/Success';
import Cancle from './pages/Cancle';
import Order from './pages/Order';

function App() {
  const dispatch=useDispatch() 
  const [cartProductCount,setCartProductCount]=useState(0);
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(SummaryApi.Current_user.url,
      {
      method: SummaryApi.Current_user.method,
      credentials: 'include'
    })
    const dataApi=await dataResponse.json();
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("Data-User in App Section",dataApi);
  }
  const fetchUserAddToCart=async()=>{
    const dataResponse=await fetch(SummaryApi.countAddToCartProduct.url,
      {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: 'include'
    })
    const dataApi=await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
    // console.log("Data Api",dataApi);
  }
  useEffect(()=>{
    // user Details
    fetchUserDetails()
    fetchUserAddToCart()

  },[])
  return (
    <Context.Provider value={{
         fetchUserDetails, //user details fetch
         cartProductCount,
         fetchUserAddToCart
    }}>
    <BrowserRouter>
          <ToastContainer 
            position='top-center'
          />
          <Navbar/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgotpassword" element={<ForgotPassword/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path='/search' element={<SearchingResultPage/>}/>
              <Route path="/product-category" element={<GetCategoryWiseProduct/>}/>
              <Route path="/displayroduct/:id" element={<DisplayFullProduct/>}/>
              <Route path='admin-panel' element={<AdminPanel/>}>
                <Route path="all-users" element={<AllUsers/>}/>
                <Route path="all-product" element={<AllProduct/>}/>
              </Route>
              <Route path="/cart" element={<Cart/>}/>
              <Route path='/success' element={<Success/>}/>
              <Route path='/cancle' element={<Cancle/>}/>
              <Route path='/order' element={<Order/>}/>
          </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
    </Context.Provider>
  )
}

export default App
