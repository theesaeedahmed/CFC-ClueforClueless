import {Course } from "@/DummyData/courseData";
import { useNavigate } from "react-router-dom";
import ContinueLearningCard from "./ContinueLearningCard";
interface ContinueLearningProps {
    mycourses: Course[]; // Props type definition
}
const ContinueLearning = ({mycourses}: ContinueLearningProps) => {
    const navigate=useNavigate();
    const coursesToShow:Course[]=mycourses?.slice(0,2);
    return(
        <div className="w-full my-20 py-20 bg-white flex flex-col justify-center items-center max-w-screen ">
            <div className="flex justify-between mb-10 w-4/6 overflow-x-clip">
                <p className="font-bold text-3xl">Continue Learning</p>
                <button onClick={()=>navigate("/myCourses")} className="rounded-lg border border-slate-800 p-2 hover:bg-slate-100 px-4">
                    View All
                </button>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center w-4/6">
                {coursesToShow?.map((course)=>(
                    <ContinueLearningCard key={course.id} course={course}/>
                ))}
            </div>
        </div>
    )
}
export default ContinueLearning;