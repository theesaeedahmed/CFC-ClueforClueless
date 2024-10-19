import Carousel from "./Carousel"
import EnrolledCoursesCard from "@/components/EnrolledCoursesCard";
import {Course } from "@/DummyData/courseData";

interface EnrolledCoursesProps {
    enrolledCourses: Course[]; // Props type definition
}
 const EnrolledCourses =({enrolledCourses}: EnrolledCoursesProps) => {
    return(
        <div className="w-9/12 flex justify-center items-center mb-8 flex-col gap-12 border-t-2 border-slate-200 pt-14">
            <div className="w-full flex items-center justify-start pl-5">
                <p className="text-3xl font-bold">My Courses</p>
            </div>

            <Carousel>
                    {enrolledCourses.map((course)=>(
                        <EnrolledCoursesCard key={course.id} course={course}/>
                    ))}
            </Carousel>
        </div>
    )
 }

 export default EnrolledCourses