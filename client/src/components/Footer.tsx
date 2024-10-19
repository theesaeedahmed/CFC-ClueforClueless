import { FaInstagram,FaTwitter,FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";



export default function Footer() {
  return (
    <footer className="bg-purple-200 w-full pt-10 flex justify-center items-center ">

        <div className="flex flex-col md:flex-row gap-8 justify-between w-11/12 pb-5">
          <div className="space-y-4">
            <p className=" font-bold text-2xl text-black text-center" >
                Stay Close, Stay Inspired. Follow Us For <span className="text-orange-500">What’s Next!</span>
            </p>
            <div className="flex space-x-2 w-full md:justify-start justify-center items-center">
                <a href="www.linkedin.com" className="hover:bg-orange-200 p-2 rounded-full"> <FaLinkedin className="text-blue-700 text-2xl"/> </a>
                <a href="www.linkedin.com" className="hover:bg-orange-200 p-2 rounded-full"> <FaInstagram className="text-pink-700 text-2xl"/></a>
                <a href="www.linkedin.com" className="hover:bg-orange-200 p-2 rounded-full"> <FaTwitter className="text-blue-700 text-2xl"/> </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
                <div className="flex w-3/5 md:w-full justify-center items-center gap-2 border border-gray-800 py-2 hover:bg-slate-200 rounded-sm
                bg-white">
                    <SiGmail className="text-red-700 text-2xl font-semibold"/>
                    <button className="text-md font-serif">Get in Touch</button>
                </div>
    
                <div className="mt-4 text-sm text-black text-center w-full">
                © 2024 ClueForClueless All rights reserved.
                </div>
            </div>
        </div>

    </footer>
  )
}