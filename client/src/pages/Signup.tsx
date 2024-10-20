import { ChangeEvent, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/auth2.png";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState<"student" | "course-creator">("student");
  const navigate = useNavigate();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      if (user) {
        navigate("/login");
      }
      toast.success("Registered Successfully", { position: "top-center" });
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user) {
        localStorage.setItem("userId", user.uid);
        navigate("/home");
      }
      toast.success("Signed in Successfully", { position: "top-center" });
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-l from-purple-400 to-white w-full min-h-screen h-full flex justify-center items-center">
      <div className="container w-4/5 min-h-[90vh] h-full bg-white shadow-2xl rounded-md flex my-4 ">
        <div className="hidden lg:flex w-1/2 bg-purple-400 shadow-2xl rounded-l-md justify-around items-center flex-col">
          <div className="w-full relative">
            <p className="text-white font-mono drop-shadow-lg font-bold text-center text-3xl italic absolute top-3 left-16">
              Empowering education,
            </p>
            <p className="text-white font-bold drop-shadow-lg font-mono text-center text-3xl absolute top-12 right-10 italic">
              anytime, anywhere
            </p>
          </div>

          <img src={loginImage} className="w-5/6 h-4/6 mt-12" />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center py-4">
          <div className="form-wrapper flex flex-col items-center justify-center h-full w-5/6">
            <div className="form-caption text-gray-700 text-center text-4xl font-semibold p-5">
              Join Us Today!
            </div>

            <div className="form-element flex flex-col justify-items-start w-full gap-4">
              <div className="mt-6">
                <h1 className="text-gray-500 dark:text-gray-300">
                  Select type of account
                </h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    className={`flex justify-center w-full px-6 py-3 text-white ${
                      role === "student" ? "bg-purple-600" : "bg-purple-300"
                    } rounded-lg md:w-auto md:mx-2 focus:outline-none`}
                    onClick={() => setRole("student")}
                  >
                    <FaUserGraduate className="w-6 h-6" />
                    <span className="mx-2">Student</span>
                  </button>

                  <button
                    className={`flex justify-center w-full px-6 py-3 mt-4 text-white ${
                      role === "course-creator"
                        ? "bg-purple-600"
                        : "bg-purple-300"
                    } border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none`}
                    onClick={() => setRole("course-creator")}
                  >
                    <FaChalkboardTeacher className="w-6 h-6" />
                    <span className="mx-2">Course Creator</span>
                  </button>
                </div>
              </div>

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="p-1">
                  Full Name
                </label>
                <input
                  placeholder="John Doe"
                  id="fullName"
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  name="fullName"
                  onChange={changeHandler}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="p-1">
                  Email
                </label>
                <input
                  placeholder="abc@xyz.com"
                  id="email"
                  type="email"
                  className="w-full p-2 border border-gray-300"
                  name="email"
                  onChange={changeHandler}
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <label htmlFor="password" className="p-1">
                  Password
                </label>
                <input
                  placeholder=" •••••••••"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-full p-2 border border-gray-300"
                  name="password"
                  onChange={changeHandler}
                />
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={() => setPasswordVisible(false)}
                    className="text-xl cursor-pointer absolute right-2 inset-y-8"
                  />
                ) : (
                  <FaEye
                    onClick={() => setPasswordVisible(true)}
                    className="text-xl cursor-pointer absolute right-2 inset-y-8"
                  />
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative w-full">
                <label htmlFor="confirmPassword" className="p-1">
                  Confirm Password
                </label>
                <input
                  placeholder=" •••••••••"
                  id="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-full p-2 border border-gray-300"
                  name="confirmPassword"
                  onChange={changeHandler}
                />
                {confirmPasswordVisible ? (
                  <FaEyeSlash
                    onClick={() => setConfirmPasswordVisible(false)}
                    className="text-xl cursor-pointer absolute right-2 inset-y-8"
                  />
                ) : (
                  <FaEye
                    onClick={() => setConfirmPasswordVisible(true)}
                    className="text-xl cursor-pointer absolute right-2 inset-y-8"
                  />
                )}
              </div>

              {/* Sign Up Button */}
              <div className="w-full flex justify-center items-center pt-4">
                <button
                  className="border-2 w-full p-2 text-purple-600 hover:text-purple-900 text-2xl bg-purple-100 hover:bg-purple-200"
                  onClick={submitHandler}
                >
                  Sign up
                </button>
              </div>

              {/* Divider */}
              <div className="flex w-full justify-center items-center">
                <div className="h-[0.5px] bg-slate-300 w-full"></div>
                <p className="px-2">OR</p>
                <div className="h-[0.5px] bg-slate-300 w-full"></div>
              </div>

              {/* Google Sign In */}
              <div className="w-full flex justify-center items-center">
                <div className="w-auto flex justify-center items-center">
                  <button
                    className="flex items-center justify-center border-2 p-1 bg-white"
                    onClick={signInWithGoogle}
                  >
                    <FcGoogle className="text-lg" />
                    <span className="text-slate-700 pl-2 text-sm">
                      Sign up with Google
                    </span>
                  </button>
                </div>
              </div>

              {/* Sign In Redirect */}
              <div className="text-center p-4">
                Already registered?{" "}
                <span
                  className="text-purple-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
