import {Course } from "@/DummyData/courseData";
import { FaStar } from "react-icons/fa";
interface RecommendedCoursesCardProps {
    course: Course; // Props type definition
}
const RecommendCoursesCard =({course}:RecommendedCoursesCardProps) => {
    return (
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow w-full hover:shadow-lg hover:shadow-slate-300">
            {/* <img
                className="object-cover w-full h-32 md:h-auto  rounded-l-lg  md:w-2/5" // Adjusted width and height for horizontal layout
                src={course.instructor.image}
                alt="Course image"
            /> */}
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <div className="flex flex-row justify-between items-start gap-2">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    {course.title}
                </h5>
                <div className="flex justify-center items-center gap-1 p-1 rounded-xl border-slate-300 border-2 font-semibold">{course.rating} <FaStar className="text-amber-500" /></div>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.description}
                </p>
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="border-2 border-amber-500 p-2 rounded-md mt-5 text-xl flex justify-center items-center font-serif">
                        Rs:1000
                    </div>
                    <button className=" text-xl mt-4 bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-500 :w-2/5 lg:w-1/3">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecommendCoursesCard;