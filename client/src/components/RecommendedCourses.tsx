import RecommendCoursesCard from "./RecommendedCoursesCard";
import {Course } from "@/DummyData/courseData";
interface RecommendedCoursesProps {
    recommendedCourses: Course[]; // Props type definition
}
const RecommendedCourses =({recommendedCourses}: RecommendedCoursesProps) => {
    return (
        <div className="w-9/12 flex flex-col gap-10 my-16 pt-16 border-t-2 border-slate-200 mb-20">
            <div className="w-full flex justify-start items-center">
                <p className="font-bold text-3xl">Top Picks for You</p>
            </div>
            <div className="flex md:flex-row flex-col gap-5 w-full">
                {recommendedCourses.map((course)=>(
                    <RecommendCoursesCard key={course.id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default RecommendedCourses;