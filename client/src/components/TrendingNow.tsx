import { Topic } from "@/DummyData/courseData";
import TrendingNowCard from "./TrendingNowCard";

interface TrendingNowProps {
    topic: Topic[];
}

const TrendingNow = ({ topic }: TrendingNowProps) => {
    return (
        <div className="flex flex-col gap-10 mb-20 justify-center items-center w-9/12 pt-16 border-t-2 border-slate-200">
            <div className="flex justify-between items-center w-full">
                <p className="font-bold text-3xl">Trending Now</p>
                <button className="rounded-lg border border-slate-800 p-2 hover:bg-slate-100 px-4">
                    View All
                </button>
            </div>

            {/* Grid with responsive columns */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-auto justify-start items-center">
                {topic.map((topic) => (
                    <TrendingNowCard key={topic.id} topic={topic} />
                ))}
            </div>
        </div>
    );
};

export default TrendingNow;
