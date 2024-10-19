import {Course } from "@/DummyData/courseData";
import { useNavigate } from "react-router-dom";
import ContinueLearningCard from "./ContinueLearningCard";
interface ContinueLearningProps {
    resumeCourses: Course[]; // Props type definition
}
const ContinueLearning = ({resumeCourses}: ContinueLearningProps) => {
    const navigate=useNavigate();
    const coursesToShow:Course[]=resumeCourses.slice(0,2);
    return(
        <div className="w-full my-20 mt-28 mb-6 py-20 pt-16 bg-white flex flex-col justify-center items-center max-w-screen border-t-2 border-slate-200">
            <div className="flex justify-between mb-10 w-4/6 overflow-x-clip">
                <p className="font-bold text-3xl">Continue Learning</p>
                <button onClick={()=>navigate("/myCourses")} className="rounded-lg border border-slate-800 p-2 hover:bg-slate-100 px-4">
                    View All
                </button>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center w-4/6">
                {coursesToShow.map((course)=>(
                    <ContinueLearningCard key={course.id} course={course}/>
                ))}
            </div>
        </div>
    )
}
export default ContinueLearning;