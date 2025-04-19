/* eslint-disable @typescript-eslint/no-unused-vars */
import Searchbar from "@/components/Searchbar";
import Navbar from "../components/Navbar";
import ContinueLearning from "@/components/ContinueLearning";
import { resumeCoursesData,Course } from "@/DummyData/courseData";
import { useState } from "react";
import { enrolledCoursesData } from "@/DummyData/courseData";
import EnrolledCourses from "@/components/EnrolledCourses";
import { RecommendCoursesData } from "@/DummyData/courseData";
import RecommendedCourses from "@/components/RecommendedCourses";
import { topicsData } from "@/DummyData/courseData";
import TrendingNow from "@/components/TrendingNow";
import Footer from "@/components/Footer";


const Home = () => {
    const[resumeCourses,setresumeCourses]=useState<Course []>(resumeCoursesData||[])
    const[enrolledCourses,setenrolledCourses]=useState<Course []>(enrolledCoursesData||[])
    return (
        <div className="w-full max-w-screen overflow-x-clip flex flex-col items-center h-full min-h-screen min-w-screen ">
            <Navbar/>
            <Searchbar/>
            {resumeCourses.length>0 ? <ContinueLearning resumeCourses={resumeCourses}/> : ""}
            {enrolledCoursesData.length>0 ? <EnrolledCourses enrolledCourses={enrolledCourses}/> : ""}
            <RecommendedCourses recommendedCourses={RecommendCoursesData}/>
            <TrendingNow topic={topicsData}/>
            <Footer/>
        </div>
    )
}
export default Home;




