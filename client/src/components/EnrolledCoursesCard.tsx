import { Link } from 'react-router-dom';
import { Course } from "@/DummyData/courseData";
import { resumeCoursesData } from '@/DummyData/courseData';
interface EnrolledCoursesCardProps {
    course: Course;
}

const EnrolledCoursesCard = ({ course }: EnrolledCoursesCardProps) => {
    const learning:boolean=resumeCoursesData.some((courseToCheck) => course.id === courseToCheck.id);
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow flex flex-col h-full hover:bg-slate-100 mx-1">
            <img className="rounded-t-lg h-40 w-full object-cover" src={course.instructor.image} alt={course.title} />

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 line-clamp-2">
                    {course.title}
                </h3>
                <p className="mb-3 font-normal text-gray-700 line-clamp-4">
                    {course.description}
                </p>
                <div className="mt-auto flex items-center justify-center">
                    <Link
                        to="/course/1"
                        className={` px-6 py-2 text-md font-semibold text-center text-white transition-all duration-200 hover:rounded-lg rounded-sm
                            ${learning? "bg-purple-600 hover:bg-purple-500":"bg-emerald-600 hover:bg-emerald-500"}`}
                    >
                        {learning? "Resume":"Start Learning"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EnrolledCoursesCard;