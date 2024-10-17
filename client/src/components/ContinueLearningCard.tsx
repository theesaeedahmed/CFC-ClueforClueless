import { Course } from "@/DummyData/courseData";

interface ContinueLearningCardProps {
    course: Course;
}

const ContinueLearningCard = ({ course }: ContinueLearningCardProps) => {
    return (
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow w-full hover:shadow-lg hover:shadow-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
                className="object-cover w-full h-32 md:h-48 rounded-t-lg md:rounded-l-lg md:rounded-t-none md:w-2/5" // Adjusted width and height for horizontal layout
                src={course.instructor.image}
                alt="Course image"
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    {course.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.description}
                </p>
                <div className="flex justify-end items-center w-full">
                    <button className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-500 w-full md:w-2/5 lg:w-1/3">
                        Resume
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContinueLearningCard;
