import { useContext, useState } from "react";
import logo from "../images/logo.png";
import { FaRegBell } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import Dialog from "@/components/Dialog";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4 h-20 border-b border-white">
      <div className="flex items-center space-x-4">
        <img src={logo} className="h-29 w-28 pt-2" />
        <p className="text-2xl font-mono font-semibold">ClueForClueless</p>
      </div>

      <div className="hidden md:flex space-x-4">
        {" "}
        {/* Hide on mobile, show on medium screens and up */}
        <div className="hover:bg-gray-700 rounded-full p-2 cursor-pointer">
          <FaRegBell className="h-6 w-6" />
        </div>
        <div className="hover:bg-gray-700 rounded-full p-2 cursor-pointer">
          <BsQuestionCircle className="h-6 w-6" />
        </div>
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-white hover:bg-gray-300 text-black text-sm py-1 px-3 rounded mx-4"
        >
          Logout
        </button>
      </div>

      {/* Hamburger icon for mobile menu */}
      <button className="md:hidden p-2" onClick={toggleMenu}>
        <span className="text-white">☰</span> {/* Basic hamburger icon */}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-gray-700 text-white w-48 rounded shadow-lg md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <div className="hover:bg-gray-700 rounded-full p-2 cursor-pointer flex items-center space-x-2">
              <FaRegBell className="h-6 w-6" />
              <p>Notifications</p>
            </div>
            <div className="hover:bg-gray-700 rounded-full p-2 cursor-pointer flex items-center space-x-2">
              <BsQuestionCircle className="h-6 w-6" />
              <p>Help</p>
            </div>
            <button
              onClick={()=>setOpenDialog(true)}
              className="bg-white hover:bg-gray-300 text-black text-sm py-1 px-3 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {openDialog && (
        <div className="bg-gray-800 text-black">
          <Dialog setOpenDialog={setOpenDialog} logoutHandler={logoutHandler} />
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;
