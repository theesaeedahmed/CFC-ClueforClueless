import Searchbar from "@/components/Searchbar";
import Navbar from "../components/Navbar";
import ContinueLearning from "@/components/ContinueLearning";
import { coursesData,Course } from "@/DummyData/courseData";
import { useState } from "react";

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const[mycourses,setMycourses]=useState<Course []>(coursesData||[])
    return (
        <div className="w-screen flex flex-col items-center h-full min-h-screen ">
            <Navbar/>
            <Searchbar/>
            {mycourses.length>0 ? <ContinueLearning mycourses={mycourses}/> : ""}
        </div>
    )
}
export default Home;




