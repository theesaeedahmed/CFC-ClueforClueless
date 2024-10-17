import { useContext, useState } from 'react'
import logo from "../images/logo.png"
import { NavLink, useNavigate } from 'react-router-dom' 
import "../css/Navbar.css"

import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/AuthContext';

const Navbar = () => {
    const [menu,setMenu] = useState(false)
    const [profile,setProfile] = useState(false)
    const { logout} = useContext(AuthContext);
    const navigate=useNavigate()
    const logoutHandler=()=>{
        logout();
        toast.success("Logged out successfully")
        navigate("/")
    }
    const menuHandler =()=> {
        if (profile){
            setProfile(false)
        }
        setMenu(!menu)
    }
    const profileHandler =()=> {
        if (menu){
            setMenu(false)
        }
        setProfile(!profile)
    }

  return (
    <div className='flex justify-between lg:w-4/5 fixed top-0 w-5/6 pb-10'>
        <div className='flex justify-center items-center w-auto'>
            <img src={logo} className='h-28 w-24 pt-2'/>
            <p className='text-xl font-mono font-semibold'>ClueForClueless</p>

        </div>

        <div className='hidden lg:flex justify-center items-center gap-5'>
            <NavLink to="/home" className="hover:text-purple-900 hover:font-semibold font-serif">Home</NavLink>
            <NavLink to="/roadmap" className="hover:text-purple-900 hover:font-semibold font-serif">Explore Paths</NavLink>
            <NavLink to="/allCourses" className="hover:text-purple-900 hover:font-semibold font-serif">Buy a Course</NavLink>
            <NavLink to="/discuss" className="hover:text-purple-900 hover:font-semibold font-serif">Discuss</NavLink>
        </div>

        <div className="flex justify-center items-center  gap-3 lg:gap-4 mr-2 lg:mr-3">

            <div className="hover:bg-purple-200 rounded-full p-2 cursor-pointer">
                <MdOutlineShoppingCart className="h-6 w-6"/>
            </div>
            <div className="hover:bg-purple-200 rounded-full p-2 cursor-pointer">
                <FaRegBell className="h-6 w-6"/>
            </div>
            <div className={`hover:bg-purple-200 rounded-full p-2 cursor-pointer ${profile ? 'bg-purple-200' : ''}`} onClick={profileHandler}>
                <RxAvatar className="h-6 w-6"/>
            </div>
            <div className={`hover:bg-purple-200 rounded-full p-2 lg:hidden relative cursor-pointer ${menu ? 'bg-purple-200' : ''}`} onClick={menuHandler}>
                <IoIosMenu className="l h-6 w-6"/>
            </div>

        </div>

        {profile && (
            <div className='absolute top-16 right-5 z-52 flex flex-col w-auto shadow-lg p-3 ml-5'>

                <button className='hover:text-purple-900 hover:font-semibold font-serif m-0 p-0 text-left'>Settings</button>
                <button className='hover:text-purple-900 hover:font-semibold font-serif m-0 p-0 text-left' onClick={logoutHandler}>Signout</button>
            </div>
        )}

        {menu && (
                <div className='absolute top-16 right-0 z-50 flex flex-col w-auto shadow-lg p-3 ml-5'>
                    <NavLink to="/home" className="hover:text-purple-900 hover:font-semibold font-serif">Home</NavLink>
                    <NavLink to="/roadmap" className="hover:text-purple-900 hover:font-semibold font-serif">Explore Paths</NavLink>
                    <NavLink to="/allCourses" className="hover:text-purple-900 hover:font-semibold font-serif">Buy a Cousre</NavLink>
                    <NavLink to="/discuss" className="hover:text-purple-900 hover:font-semibold font-serif">Discuss</NavLink>
                </div>
            )}

    </div>
  )
}
    
export default Navbar;