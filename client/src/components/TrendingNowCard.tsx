import { Topic } from "@/DummyData/courseData";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface TrendingNowCardProps {
    topic: Topic;
}

const TrendingNowCard = ({ topic }: TrendingNowCardProps) => {
    return (
        <Link to="/topic/1">
            <div className="w-full bg-blue-900 h-28 rounded-lg flex flex-col justify-between items-start p-4 group">
                <div className="text-white text-left text-xl font-medium w-full">
                    <p>{topic.title}</p>
                </div>
                <div className="text-white flex justify-end font-medium w-full">
                        <FaArrowRight 
                        className="text-white text-4xl p-2  group-hover:bg-white group-hover:text-black group-hover:rounded-full transition-all duration-1000"
                        />
                </div>
            </div>
        </Link>
    );
}

export default TrendingNowCard;
