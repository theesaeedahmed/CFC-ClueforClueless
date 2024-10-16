import { ChangeEvent, useContext, useState } from "react"
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/auth2.png";
import { IoBookOutline, IoRocketOutline, IoBulbOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
interface FormData {
  email: string;
  password: string;
}
const Login = () =>{

    const [visible,setVisible] = useState(false)
    const [formData,setFormData] = useState<FormData>({email:"", password:""})
    const navigate = useNavigate();
    const{ setIsAuthenticated} = useContext(AuthContext);


    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    const submitHandler = async(e: React.FormEvent) => {
      e.preventDefault();
      try{
        await signInWithEmailAndPassword(auth, formData.email,formData.password);
        const user = auth.currentUser;
        //console.log(user);
        if(user){
          // axios.post("http://localhost:3001/api/v1/auth/login",{uid:user.uid,email:formData.email,fullName:formData.fullName})
          localStorage.setItem("userId",user.uid);
          setIsAuthenticated(true);
          navigate("/home");
        }
        //console.log("user created");
        toast.success("Logged in Successfully",{position:"top-center",duration:3000});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(error:any){
        toast.error(error.message,{position:"top-center"});
        console.log(error);
      }
      //console.log(formData);
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
                                Welcome Back!
                            </div>

                            <div className="form-element flex flex-col justify-items-start w-full gap-4">
                                <div>
                                <label htmlFor="email" className="p-1">Email</label>
                                <input placeholder="abc@xyz.com"id="email"type="email" className="w-full p-2 border border-gray-300"
                                name="email" onChange={changeHandler}/>
                                </div>
                                
                                <div className="relative w-full">
                                    <label htmlFor="password" className="p-1">Password</label>
                                    <input placeholder=" •••••••••" id="password"type={visible ? "text" : "password"} className="w-full p-2 border border-gray-300"
                                    name="password" onChange={changeHandler}/>
                                    {visible ? <FaEyeSlash onClick={() => setVisible(false)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/> : <FaEye onClick={() => setVisible(true)} className="text-xl cursor-pointer absolute right-2 inset-y-8"/>}
                                    <button className="absolute right-0 inset-y-16 pt-1 text-xs text-red-600 hover:text-red-800">Forgot password?</button>
                                </div>
                                
                                <div className="w-full flex justify-center items-center pt-4  ">
                                    <button className=" border-2 w-full p-2 text-purple-600 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200 "
                                    onClick={submitHandler}> 
                                      Sign in
                                    </button>
                                </div>

                                <div className="flex w-full justify-center items-center">
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                    <p className="px-2">OR</p>
                                    <div className="h-[0.5px] bg-slate-300 w-full"></div>
                                </div>

                                <div className="w-full flex justify-center items-center pt-2">
                                    <div className="w-1/2 flex justify-center items-center border-[1px] gap-4 rounded-lg  text-black p-2 hover:bg-slate-300 border-slate-500">
                                        <FcGoogle className="text-2xl"/>
                                        <button>Sign in with Google</button>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center items-center">
                                    <p>Don't have an account? <button className="text-purple-600 hover:text-purple-900 font-semibold underline" onClick={()=> navigate("/signup")}>SIGN UP</button></p>
                                </div>


                            </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login   