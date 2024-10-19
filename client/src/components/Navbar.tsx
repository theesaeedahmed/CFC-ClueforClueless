import { useContext, useState } from 'react'
import logo from "../images/logo.png"
import { NavLink, useNavigate } from 'react-router-dom' 
import "../css/Navbar.css"
import { PiSignOut,PiBookOpenTextLight } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineShoppingCart,MdPerson } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/AuthContext';
import Dialog from './Dialog';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu,setMenu] = useState(false)
    const [profile,setProfile] = useState(false)
    const { logout} = useContext(AuthContext);
    const navigate=useNavigate()
    const [openDialog, setOpenDialog] = useState(false);
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
        <div className='fixed top-0 bg-white w-full z-10 flex justify-between items-center flex-col border-b-[0.5px] border-slate-200'>
        <div className='flex  justify-between w-11/12 my-0 py-0 bg-white'>
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

            <div className="flex justify-center items-center  gap-3 lg:gap-4 mr-4">

                <div className="hover:bg-purple-200 rounded-full p-2 cursor-pointer">
                    <MdOutlineShoppingCart className="h-6 w-6"/>
                </div>
                <div className="hover:bg-purple-200 rounded-full p-2 cursor-pointer">
                    <FaRegBell className="h-6 w-6"/>
                </div>
                <div className={`hover:bg-purple-200 rounded-full p-2 lg:hidden relative cursor-pointer ${menu ? 'bg-purple-200' : ''}`} onClick={menuHandler}>
                    <IoIosMenu className="l h-6 w-6"/>
                </div>
                <div className={`hover:bg-purple-200 rounded-full p-2 cursor-pointer ${profile ? 'bg-purple-200' : ''}`} onClick={profileHandler}>
                    <RxAvatar className="h-6 w-6"/>
                </div>


            </div>

            {profile && (
                <div className='absolute top-20 right-5 z-50 flex flex-col w-auto shadow-lg p-3 ml-5 bg-white pr-16 gap-2'>
                    <div className='flex items-center justify-start gap-3 py-3'>
                        <div className='rounded-full border border-slate-400'>
                            <MdPerson className='h-14 w-14'/>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-bold'>John Doe</p>
                            <Link to="/premium" className='text-amber-600 text-xs'>Access all features with our</Link>
                            <Link to="/premium" className='text-amber-600 text-xs'> Premium Subsciption!</Link>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IoPersonOutline className='h-5 w-5'/>
                        <button className='hover:text-purple-900 hover:font-semibold font-serif m-0 p-0 text-left'>My Profile</button>
                    </div>
                    <div className='flex items-center gap-2'>
                        < PiBookOpenTextLight className='h-5 w-5'/>
                        <button className='hover:text-purple-900 hover:font-semibold font-serif m-0 p-0 text-left'>My Learnings</button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PiSignOut className='h-5 w-5'/>
                        <button className='hover:text-purple-900 hover:font-semibold font-serif m-0 p-0 text-left' onClick={()=>setOpenDialog(true)}>Signout</button>
                    </div>
                </div>
            )}

            {menu && (
                    <div className='absolute top-20 right-0 z-50 flex flex-col w-auto shadow-lg p-3 ml-5 bg-white pr-16 gap-2'>
                        <NavLink to="/home" className="hover:text-purple-900 hover:font-semibold font-serif">Home</NavLink>
                        <NavLink to="/roadmap" className="hover:text-purple-900 hover:font-semibold font-serif">Explore Paths</NavLink>
                        <NavLink to="/allCourses" className="hover:text-purple-900 hover:font-semibold font-serif">Buy a Cousre</NavLink>
                        <NavLink to="/discuss" className="hover:text-purple-900 hover:font-semibold font-serif">Discuss</NavLink>
                    </div>
                )}
            
            {openDialog && (
                <Dialog setOpenDialog={setOpenDialog} logoutHandler={logoutHandler}/>
            )}

        </div>
        </div>
  )
}
    
export default Navbar;