import { ChangeEvent, useState } from "react"
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/auth2.png";
import { IoBookOutline, IoRocketOutline, IoBulbOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup = () =>{

    const [passwordVisible,setPasswordVisible] = useState(false)
    const [ConfirmPasswordVisible,setConfirmPasswordVisible] = useState(false)
    const [formData,setFormData] = useState<FormData>({fullName:"",email:"", password:"", confirmPassword:""});
    const navigate = useNavigate();


    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    const submitHandler = () => {
      console.log(formData);
    };

    return (
        <div className="bg-gradient-to-l from-purple-400 to-white w-full min-h-screen h-full flex justify-center items-center">
            <div className="container w-4/5 min-h-[90vh] h-full bg-white shadow-2xl rounded-md flex my-4 ">

                <div className="hidden lg:flex w-1/2 bg-purple-400 shadow-2xl rounded-l-md justify-around items-center flex-col">
                  <div className="w-full relative">
                  <p className="text-white font-mono drop-shadow-lg font-bold text-center text-3xl italic absolute top-3 left-16">Empowering education,</p>
                  <p className="text-white font-bold drop-shadow-lg font-mono text-center text-3xl absolute top-12 right-10 italic">anytime, anywhere</p>
                </div>
                  
                  <img src={loginImage} className="w-5/6 h-4/6 mt-12"/>
                  <div className="flex gap-3 justify-center items-center w-3/5 pb-2">
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-purple-500 rounded-full p-1">< HiMagnifyingGlass className="text-white text-4xl p-1 "/></div>
                      <p className="text-white text-md">Discover</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-purple-500 rounded-full p-1">< IoBookOutline className="text-white text-4xl p-1 "/></div>
                      <p className="text-white text-md">Learn</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-purple-500 rounded-full p-1">< IoRocketOutline className="text-white text-4xl p-1 "/></div>
                      <p className="text-white text-md">Grow</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="bg-purple-500 rounded-full p-1">< IoBulbOutline className="text-white text-4xl p-1 "/></div>
                      <p className="text-white text-md">Innovate</p>
                    </div>    
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center items-center py-4">
                    <div className="form-wrapper flex flex-col items-center justify-center h-full w-5/6 ">
                            <div className="form-caption text-gray-700 text-center text-4xl font-semibold p-5">
                                Join Us Today!
                            </div>

                            <div className="form-element flex flex-col justify-items-start w-full gap-4">
                            <div>
                                <label htmlFor="fullName" className="p-1">Full Name</label>
                                <input placeholder="John Doe"id="fullName"type="text" className="w-full p-2 border border-gray-300"
                                name="fullName" onChange={changeHandler}/>
                                </div>

                                <div>
                                <label htmlFor="email" className="p-1">Email</label>
                                <input placeholder="abc@xyz.com"id="email"type="email" className="w-full p-2 border border-gray-300"
                                name="email" onChange={changeHandler}/>
                                </div>
                                
                                <div className="relative w-full">
                                    <label htmlFor="password" className="p-1">Password</label>
                                    <input placeholder=" •••••••••" id="password"type={passwordVisible ? "text" : "password"} className="w-full p-2 border border-gray-300"
                                    name="password" onChange={changeHandler}/>
                                    {passwordVisible ? <FaEyeSlash onClick={() => setPasswordVisible(false)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/> : <FaEye onClick={() => setPasswordVisible(true)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/>}
                                </div>

                                <div className="relative w-full">
                                    <label htmlFor="confirmPassword" className="p-1">Confirm Password</label>
                                    <input placeholder=" •••••••••" id="confirmPassword"type={ConfirmPasswordVisible ? "text" : "password"} className="w-full p-2 border border-gray-300"
                                    name="confirmPassword" onChange={changeHandler}/>
                                    {ConfirmPasswordVisible ? <FaEyeSlash onClick={() => setConfirmPasswordVisible(false)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/> : <FaEye onClick={() => setConfirmPasswordVisible(true)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/>}
                                </div>
                                
                                <div className="w-full flex justify-center items-center pt-4  ">
                                    <button className=" border-2 w-full p-2 text-purple-600 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 "
                                    onClick={submitHandler}> 
                                      Sign up
                                    </button>
                                </div>

                                <div className="flex w-full justify-center items-center">
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                    <p className="px-2">OR</p>
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                </div>

                                <div className="w-full flex justify-center items-center">
                                    <div className="w-1/2 flex justify-center items-center border-[1px] gap-4 rounded-lg  text-black p-2 hover:bg-slate-300 border-slate-500">
                                        <FcGoogle className="text-2xl"/>
                                        <button>Sign up with Google</button>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center items-center">
                                    <p>Already have an account? <button className="text-purple-600 hover:text-purple-900 font-semibold underline" onClick={()=> navigate("/login")}>SIGN IN</button></p>
                                </div>


                            </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Signup   