import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux'
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import { useContext, useEffect, useState } from "react";
import ROLE from "../../../common/role";
import SearchingResultPage from "../../pages/SearchingResultPage";
import Context from "../../context";

import "./Navbar.css";

 const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const context=useContext(Context)
  const user=useSelector(state=>state?.user?.user)
  const dispatch=useDispatch();
  const [menuDisplay,setMenuDispaly]=useState(false);
  // console.log("User header",user);
  const navigate=useNavigate();
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
   const[searchProduct,setSearchProduct]=useState(searchQuery)
  const handleSearch=(e)=>{
    const {value}=e.target
    setSearchProduct(value)
    if(searchProduct){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  const handleLogout=async()=>{
    const fetchData=await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:'include'
    })
    const data=await fetchData.json()
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if(data.error){
      toast.error(data.message);
    }
  }
  const mouseEnterOnProfileIcon=()=>{
    setMenuDispaly("true")
  }
  const mouseLeaveOnProfileIcon=()=>{
    setMenuDispaly(prev=>!prev);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className=" h-16 shadow-md bg-cyan-950  w-full z-40 sticky top-0">
        <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="text-stroke font-bold text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <NavLink to="/" className="px-4 py-2 rounded-lg    ">
                Resav Kundu
            </NavLink>
        </div>


          <div className="hidden lg:flex items-center w-full justify-between max-w-lg border rounded-full focus-within:shadow pl-2 bg-slate-100">
            <input type="text" placeholder="serach product here...." className='w-full outline-none bg-slate-100 pl-4'
              onChange={handleSearch}
              value={searchProduct}
            />
           <NavLink to="/search">
              <div className="text-lg min-w-[50px] h-10 bg-slate-600 hover:bg-slate-700 flex items-center justify-center rounded-r-full text-white"
              
              > 
              <FaSearch />
              </div>
           </NavLink>
          </div>

          <div className="flex justify-center gap-3">
             <div className=" flex  cursor-pointer relative ">
             {
              user?._id &&
              (
                <div className="text-3xl cursor-pointer relative flex justify-center "  onClick={()=>setMenuDispaly(prev=>!prev)} >  
                 {/* onClick={()=>setMenuDispaly(prev=>!prev)} */}
                {
                  user?.profilepic?  (
                    <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                  ):<FaRegUserCircle />
                  
                }
                </div>
              )
             }
             
           {
             menuDisplay && (

            <div className="bg-slate-800 h-full w-full fixed bg-opacity-50 left-0 right-0 top-14 bottom-0 flex justify-center items-center "  >
              <div className="absolute bg-white bottom-0 top-2 right-72 h-fit p-2 shadow-lg  " onMouseEnter={mouseEnterOnProfileIcon} onMouseLeave={mouseLeaveOnProfileIcon} >
                    <nav>
                      {
                        user?.role ===ROLE.ADMIN && 
                        <NavLink to={"/admin-panel/all-product"}  className="whitespace-nowrap hidden md:block hover:bg-slate-100 hover:text-slate-600 hover:border bg-slate-50 p-1 " onClick={()=>setMenuDispaly(prev=>!prev)}>Admin Panel</NavLink>
                        }
                    </nav>
                    <NavLink to={"/order"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 hover:text-slate-600 hover:border bg-slate-50 p-1 " onClick={()=>setMenuDispaly(prev=>!prev)}>Order</NavLink>
              </div>
            </div>
             )
           }
             </div>
              <NavLink to="/cart" className="text-3xl cursor-pointer relative">
                <span className="text-white"><FaShoppingCart /></span>
                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                      <p className="text-xs ">{context?.cartProductCount || 0}</p>
                    </div>
              </NavLink>
              <div>
                  {
                    user?._id?
                    <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white font-semibold bg-orange-700 hover:bg-orange-600 transition-all ease-out duration-200"><NavLink to="/logout">Log Out</NavLink></button>
                    :<button className="px-3 py-1 rounded-full text-white bg-orange-700 hover:bg-orange-600 "><NavLink to="/login">Login</NavLink></button>
                  }
              </div>
          </div>
        </div>
        {isVisible && <div className="h-1 bg-pink-500"></div>}
      </header>
    </>
  );
};

export default Navbar;