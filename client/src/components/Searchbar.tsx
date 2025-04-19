import { useState,useEffect } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2";

const placeholders: string[] = [
    "Search for courses...",
    "Browse through roadmaps...",
    "Find new learning resources...",
    "Explore paths to success..."
];

const Searchbar = () => {
    const[searchTerm, setSearchTerm] = useState<string>("")
    const [currentPlaceholder, setCurrentPlaceholder] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);

    useEffect(() => {
        const typeInterval = setInterval(() => {
            if (charIndex < placeholders[index].length) {
                setCurrentPlaceholder(prev => prev + placeholders[index][charIndex]);
                setCharIndex(prev => prev + 1);
            } else {
                clearInterval(typeInterval);

                // Pause before clearing and starting next word
                setTimeout(() => {
                    setCharIndex(0);
                    setCurrentPlaceholder("");  // Clear current placeholder
                    setIndex((prevIndex) => (prevIndex + 1) % placeholders.length); // Move to the next placeholder
                }, 1000);  // 2 second pause before next word
            }
        }, 100); // Typing speed: 100ms per letter

        return () => clearInterval(typeInterval); // Cleanup interval
    }, [charIndex, index]);

    return (
        <div className="bg-gradient-to-b from-purple-200 to-white  min-h-[30vh] w-full mt-28 flex flex-col justify-center items-center pt-20 z-0 max-w-screen ">
            <p className="text-3xl font-bold text-center mb-10">Explore Our Courses And Resources!</p>
            <div className="relative lg:w-2/5 w-3/5 z-5">
            <input
                id="searchTerm" 
                type="text" 
                className="w-full rounded-lg p-2 border border-gray-600 relative pr-10 h-14 placeholder:text-lg "  
                value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder={currentPlaceholder}
            />
            <HiMagnifyingGlass className="text-3xl text-purple-700 mt-5 absolute right-3 top-[5.5px] transform -translate-y-1/2"/>
            </div>
            <div className="flex justify-center items-center mt-5 gap-3">
                <button className="bg-slate-200 p-2 rounded-lg text-sm border border-slate-600 shadow-lg font-medium hover:bg-slate-300">
                    Path Guidance
                </button>
                <button className="bg-amber-400 p-2 rounded-lg text-sm border border-amber-600 shadow-lg font-medium hover:bg-amber-500">
                    Go Premium
                </button>
                <button className="bg-slate-200 p-2 rounded-lg text-sm border border-slate-600 shadow-lg font-medium hover:bg-slate-300">
                    Newly Launched
                </button>
                

            </div>
        </div>
    )
}

export default Searchbar