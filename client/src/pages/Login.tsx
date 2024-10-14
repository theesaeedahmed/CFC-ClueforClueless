import { useState } from "react"
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Logo from "../components/LogoMUI";

const Login = () =>{

    const [visible,setVisible] = useState(false)

    return (
        <div className="bg-gradient-to-l from-purple-400 to-white w-full min-h-screen h-full flex justify-center items-center">
            <div className="container w-4/5 min-h-[90vh] h-full bg-white shadow-2xl rounded-md flex flex-nowrap my-4 ">

                <div className="hidden lg:flex w-1/2 bg-purple-400 shadow-2xl rounded-l-md">
                 <Logo/> 
                </div>

                <div className="w-full lg:w-1/2 flex justify-center items-center py-4">
                    <div className="form-wrapper flex flex-col items-center justify-center h-full w-5/6 ">
                            <div className="form-caption text-gray-700 text-center text-4xl font-semibold p-5">
                                Welcome Back!
                            </div>

                            <div className="form-element flex flex-col justify-items-start w-full gap-4">
                                <div>
                                <label htmlFor="email" className="p-1">Email</label>
                                <input placeholder="abc@xyz.com"id="email"type="email" className="w-full p-2 border border-gray-300"/>
                                </div>
                                
                                <div className="relative w-full">
                                    <label htmlFor="password" className="p-1">Password</label>
                                    <input placeholder=" •••••••••" id="password"type={visible ? "text" : "password"} className="w-full p-2 border border-gray-300"/>
                                    {visible ? <FaEyeSlash onClick={() => setVisible(false)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/> : <FaEye onClick={() => setVisible(true)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/>}
                                    <button className="absolute right-0 inset-y-16 text-xs text-red-600 hover:text-red-800">Forgot password?</button>
                                </div>
                                
                                <div className="w-full flex justify-center items-center pt-4  ">
                                    <button className=" border-2 w-full p-2 text-purple-600 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 "> Sign in</button>
                                </div>

                                <div className="flex w-full justify-center items-center">
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                    <p className="px-2">OR</p>
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                </div>

                                <div className="w-full flex justify-center items-center">
                                    <div className="w-2/5 flex justify-center items-center border-2 gap-4 bg-black text-white p-2 hover:bg-slate-700">
                                        <FcGoogle className="text-2xl"/>
                                        <button>Sign in with Google</button>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center items-center">
                                    <p>Don't have an account? <button className="text-purple-600 hover:text-purple-900 font-semibold underline">SIGN UP</button></p>
                                </div>


                            </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login   